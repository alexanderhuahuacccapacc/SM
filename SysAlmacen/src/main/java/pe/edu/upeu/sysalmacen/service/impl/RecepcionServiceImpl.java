package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.dtos.RecepcionDTO;
import pe.edu.upeu.sysalmacen.mappers.RecepcionMapper;
import pe.edu.upeu.sysalmacen.model.Recepcion;
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

    @Override
    public RecepcionDTO guardarRecepcion(RecepcionDTO recepcionDTO) {
        Recepcion recepcion = recepcionMapper.toEntity(recepcionDTO);
        Recepcion saved = recepcionRepository.save(recepcion);

        // Actualizar stock del repuesto
        stockService.incrementarStock(saved.getRepuesto().getIdRepuesto(), saved.getCantidadRecibida());

        return recepcionMapper.toDto(saved);
    }

    @Override
    public RecepcionDTO actualizarRecepcion(Long id, RecepcionDTO recepcionDTO) {
        Recepcion existente = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada con id: " + id));

        recepcionDTO.setId(id);
        Recepcion actualizado = recepcionRepository.save(recepcionMapper.toEntity(recepcionDTO));

        return recepcionMapper.toDto(actualizado);
    }

    @Override
    public void eliminarRecepcion(Long id) {
        Recepcion recepcion = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada con id: " + id));

        recepcionRepository.delete(recepcion);
    }

    @Override
    public void validarRecepcion(Long id) {
        Recepcion recepcion = recepcionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recepción no encontrada con id: " + id));

        recepcion.setEstado("VALIDADA");
        recepcionRepository.save(recepcion);
    }
}


