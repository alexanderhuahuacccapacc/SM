package pe.edu.upeu.sysalmacen.service;

import pe.edu.upeu.sysalmacen.dtos.RecepcionDTO;
import pe.edu.upeu.sysalmacen.model.Recepcion;

import java.util.List;

public interface RecepcionService {
    List<RecepcionDTO> obtenerTodas();
    RecepcionDTO obtenerPorId(Long id);
    RecepcionDTO guardarRecepcion(RecepcionDTO dto);
    RecepcionDTO actualizarRecepcion(Long id, RecepcionDTO dto);
    void eliminarRecepcion(Long id);
    void cambiarEstado(Long id, String nuevoEstado);
    void validarRecepcion(Long id);
}