package pe.edu.upeu.sysalmacen.service;

import pe.edu.upeu.sysalmacen.model.Bus;

import java.util.List;
import java.util.Optional;

public interface IBusService extends ICrudGenericoService<Bus, String>{
    List<Bus> listarTodos();
    Optional<Bus> buscarPorId(String id);
    Bus registrar(Bus bus);
    Bus actualizar(Bus bus);
    void eliminar(String placa);
    List<Bus> buscarPorModelo(String modelo);
    List<Bus> buscarPorEstado(String estado);
}
