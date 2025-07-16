package pe.edu.upeu.sysalmacen.service;

import pe.edu.upeu.sysalmacen.dtos.MovimientoInventarioDTO;
import pe.edu.upeu.sysalmacen.model.MovimientoInventario;

import java.util.List;
import java.util.Optional;

public interface IMovimientoInventarioService extends ICrudGenericoService<MovimientoInventario, Integer>{
    List<MovimientoInventario> listar();
    List<MovimientoInventarioDTO> listarDto();
    Optional<MovimientoInventario> buscarPorId(Integer id);
    MovimientoInventario registrar(MovimientoInventario movimiento);
    MovimientoInventario actualizar(MovimientoInventario movimiento);
    void eliminar(Integer id);
}
