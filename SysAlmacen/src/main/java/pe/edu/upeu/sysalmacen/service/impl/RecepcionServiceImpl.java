package pe.edu.upeu.sysalmacen.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.dtos.RecepcionDTO;
import pe.edu.upeu.sysalmacen.mappers.RecepcionMapper;
import pe.edu.upeu.sysalmacen.model.Recepcion;
import pe.edu.upeu.sysalmacen.model.Repuesto;
import pe.edu.upeu.sysalmacen.repository.IRepuestoRepository;
import pe.edu.upeu.sysalmacen.repository.RecepcionRepository;
import pe.edu.upeu.sysalmacen.service.RecepcionService;
import pe.edu.upeu.sysalmacen.service.StockService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RecepcionServiceImpl implements RecepcionService {

    private final RecepcionRepository recepcionRepository;
    private final StockService stockService;
    private final RecepcionMapper recepcionMapper;
    private final IRepuestoRepository repuestoRepository;


    @Override
    public List<RecepcionDTO> obtenerTodas() {
        return recepcionMapper.toDtoList(recepcionRepository.findAll());
    }

    @Override
    public RecepcionDTO obtenerPorId(Long id) {
        Recepcion recepcion = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada con id: " + id));
        return recepcionMapper.toDto(recepcion);
    }
    @Transactional
    @Override
    public RecepcionDTO guardarRecepcion(RecepcionDTO recepcionDTO) {
        Recepcion recepcion = recepcionMapper.toEntity(recepcionDTO);
        Recepcion saved = recepcionRepository.save(recepcion);

        // Solo incrementar si se guarda como VALIDADA
        if("VALIDADA".equals(recepcionDTO.getEstado())) {
            stockService.incrementarStock(saved.getRepuesto().getIdRepuesto(), saved.getCantidadRecibida());
        }

        return recepcionMapper.toDto(saved);
    }

    @Override
    public RecepcionDTO actualizarRecepcion(Long id, RecepcionDTO recepcionDTO) {
        Recepcion existente = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada con id: " + id));

        // Obtener el repuesto actualizado desde el idRepuesto
        Repuesto repuesto = repuestoRepository.findById(recepcionDTO.getIdRepuesto())
                .orElseThrow(() -> new NoSuchElementException("Repuesto no encontrado con id: " + recepcionDTO.getIdRepuesto()));

        // Actualizar los campos
        existente.setCantidadRecibida(recepcionDTO.getCantidadRecibida());
        existente.setCodigo(recepcionDTO.getCodigo());
        existente.setEstado(recepcionDTO.getEstado());
        existente.setFechaRecepcion(recepcionDTO.getFechaRecepcion());
        existente.setProveedor(recepcionDTO.getProveedor());
        existente.setRepuesto(repuesto); // aquí sí se actualiza correctamente el repuesto

        Recepcion actualizado = recepcionRepository.save(existente);
        return recepcionMapper.toDto(actualizado);
    }

    @Override
    public void eliminarRecepcion(Long id) {
        Recepcion recepcion = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada con id: " + id));

        recepcionRepository.delete(recepcion);
    }

    @Override
    @Transactional
    public void validarRecepcion(Long id) {
        Recepcion recepcion = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada"));

        if(!"VALIDADA".equals(recepcion.getEstado())) {
            recepcion.setEstado("VALIDADA");
            recepcionRepository.save(recepcion);

            // Incrementar stock solo si cambia de estado
            stockService.incrementarStock(
                    recepcion.getRepuesto().getIdRepuesto(),
                    recepcion.getCantidadRecibida()
            );
        }
    }
}


