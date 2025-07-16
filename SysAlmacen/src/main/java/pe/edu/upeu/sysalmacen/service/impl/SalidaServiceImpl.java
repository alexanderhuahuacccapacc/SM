package pe.edu.upeu.sysalmacen.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.dtos.SalidaDTO;
import pe.edu.upeu.sysalmacen.exception.BusinessException;
import pe.edu.upeu.sysalmacen.exception.RepuestoNotFoundException;
import pe.edu.upeu.sysalmacen.exception.SalidaNotFoundException;
import pe.edu.upeu.sysalmacen.mappers.SalidaMapper;
import pe.edu.upeu.sysalmacen.model.Repuesto;
import pe.edu.upeu.sysalmacen.model.Salida;
import pe.edu.upeu.sysalmacen.repository.IRepuestoRepository;
import pe.edu.upeu.sysalmacen.repository.SalidaRepository;
import pe.edu.upeu.sysalmacen.service.SalidaService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalidaServiceImpl implements SalidaService {

    private final SalidaRepository salidaRepository;
    private final IRepuestoRepository repuestoRepository;
    private final SalidaMapper salidaMapper;

    @Override
    public List<SalidaDTO> findAll() {
        return salidaMapper.toDtoList(salidaRepository.findAllWithRepuesto());
    }

    @Override
    public SalidaDTO findById(Long id) {
        return salidaRepository.findById(id)
                .map(salidaMapper::toDto)
                .orElseThrow(() -> new SalidaNotFoundException("Salida no encontrada con ID: " + id));
    }

    @Override
    public SalidaDTO save(SalidaDTO dto) {
        Repuesto repuesto = repuestoRepository.findById(dto.getIdRepuesto())
                .orElseThrow(() -> new RepuestoNotFoundException("Repuesto no encontrado con ID: " + dto.getIdRepuesto()));

        Salida entity = salidaMapper.toEntity(dto);
        entity.setRepuesto(repuesto);

        Salida saved = salidaRepository.save(entity);
        return salidaMapper.toDto(saved);
    }

    @Override
    public SalidaDTO update(Long id, SalidaDTO dto) {
        Salida salida = salidaRepository.findById(id)
                .orElseThrow(() -> new SalidaNotFoundException("Salida no encontrada con ID: " + id));

        Repuesto repuesto = repuestoRepository.findById(dto.getIdRepuesto())
                .orElseThrow(() -> new RepuestoNotFoundException("Repuesto no encontrado con ID: " + dto.getIdRepuesto()));

        salida.setRepuesto(repuesto);
        salida.setCantidadEntregada(dto.getCantidadEntregada());
        salida.setDestinatario(dto.getDestinatario());
        salida.setCodigo(dto.getCodigo());
        salida.setFechaSalida(dto.getFechaSalida());
        salida.setEstado(dto.getEstado());

        Salida updated = salidaRepository.save(salida);
        return salidaMapper.toDto(updated);
    }

    @Override
    public void delete(Long id) {
        if (!salidaRepository.existsById(id)) {
            throw new SalidaNotFoundException("Salida no encontrada con ID: " + id);
        }
        salidaRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SalidaDTO registrarSalida(Long idRepuesto, Integer cantidad, String destinatario) {
        // 1. Verificar existencia del repuesto
        Repuesto repuesto = repuestoRepository.findById(idRepuesto)
                .orElseThrow(() -> new EntityNotFoundException("Repuesto no encontrado"));

        // 2. Verificar stock suficiente
        if (repuesto.getStockActual() < cantidad) {
            throw new BusinessException("Stock insuficiente" +
                    repuesto.getStockActual() + ", Cantidad solicitada: " + cantidad);

        }

        // 3. Crear la salida
        Salida salida = new Salida();
        salida.setRepuesto(repuesto);
        salida.setCantidadEntregada(cantidad);
        salida.setFechaSalida(LocalDate.now());
        salida.setDestinatario(destinatario);
        salida.setCodigo(generarCodigo());
        salida.setEstado("PENDIENTE");

        // 4. Actualizar stock del repuesto
        repuesto.setStockActual(repuesto.getStockActual() - cantidad);
        repuestoRepository.save(repuesto);

        // 5. Guardar la salida
        Salida savedSalida = salidaRepository.save(salida);

        return salidaMapper.toDto(savedSalida);
    }


    /* ------------ Método util opcional para generar código único ----------- */
    private String generarCodigo() {
        return "SAL-" + System.currentTimeMillis();
    }

    @Override
    @Transactional
    public SalidaDTO actualizarSalidaConStock(Long id, SalidaDTO dto, Integer diferenciaStock) throws BusinessException {
        Salida salida = salidaRepository.findById(id)
                .orElseThrow(() -> new SalidaNotFoundException("No se encontró la salida con ID: " + id));

        // Validar que no se cambie el repuesto
        if (!salida.getRepuesto().getIdRepuesto().equals(dto.getIdRepuesto())) {
            throw new BusinessException("No se puede cambiar el repuesto de una salida existente");
        }

        Repuesto repuesto = repuestoRepository.findById(dto.getIdRepuesto())
                .orElseThrow(() -> new RepuestoNotFoundException("Repuesto no encontrado"));

        // Validar nuevo stock
        int nuevoStock = repuesto.getStockActual() - diferenciaStock;
        if (nuevoStock < 0) {
            throw new BusinessException(String.format(
                    "Stock insuficiente. Disponible: %d, Diferencia solicitada: %d",
                    repuesto.getStockActual(), diferenciaStock));
        }

        // Actualizar stock
        repuesto.setStockActual(nuevoStock);
        repuestoRepository.save(repuesto);

        // Actualizar salida
        salida.setCantidadEntregada(dto.getCantidadEntregada());
        salida.setDestinatario(dto.getDestinatario());
        salida.setCodigo(dto.getCodigo());
        salida.setFechaSalida(dto.getFechaSalida());
        salida.setEstado(dto.getEstado());

        return salidaMapper.toDto(salidaRepository.save(salida));
    }

    @Transactional
    public void deleteWithStockUpdate(Long id) {
        // 1. Obtener la salida a eliminar
        Salida salida = salidaRepository.findById(id)
                .orElseThrow(() -> new SalidaNotFoundException("Salida no encontrada con ID: " + id));

        // 2. Obtener el repuesto asociado
        Repuesto repuesto = salida.getRepuesto();

        // 3. Actualizar el stock (sumar la cantidad eliminada)
        repuesto.setStockActual(repuesto.getStockActual() + salida.getCantidadEntregada());
        repuestoRepository.save(repuesto);

        // 4. Eliminar la salida
        salidaRepository.delete(salida);
    }
}



