package pe.edu.upeu.sysalmacen.service;

import pe.edu.upeu.sysalmacen.dtos.SolicitudCompraDTO;
import pe.edu.upeu.sysalmacen.model.SolicitudCompra;

import java.util.List;
import java.util.Optional;

public interface ISolicitudCompraService extends ICrudGenericoService<SolicitudCompra, Integer>{
    List<SolicitudCompra> listar();
    List<SolicitudCompraDTO> listarDto();
    Optional<SolicitudCompra> buscarPorId(Integer id);
    SolicitudCompra registrar(SolicitudCompra solicitud);
    SolicitudCompra actualizar(SolicitudCompra solicitud);
    void eliminar(Integer id);
}
