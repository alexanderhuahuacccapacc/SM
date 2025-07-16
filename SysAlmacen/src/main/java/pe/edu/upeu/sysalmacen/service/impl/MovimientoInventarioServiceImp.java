package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.dtos.MovimientoInventarioDTO;
import pe.edu.upeu.sysalmacen.mappers.MovimientoInvetarioMapper;
import pe.edu.upeu.sysalmacen.model.MovimientoInventario;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.repository.IMovimientoInventarioRepository;
import pe.edu.upeu.sysalmacen.service.IMovimientoInventarioService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovimientoInventarioServiceImp extends CrudGenericoServiceImp<MovimientoInventario, Integer> implements IMovimientoInventarioService {

    private final IMovimientoInventarioRepository repo;
    private final MovimientoInvetarioMapper mapper;

    @Override
    public List<MovimientoInventario> listar() {
        return repo.findAll();
    }

    @Override
    public List<MovimientoInventarioDTO> listarDto() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<MovimientoInventario> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    @Override
    public MovimientoInventario registrar(MovimientoInventario movimiento) {
        return repo.save(movimiento);
    }

    @Override
    public MovimientoInventario actualizar(MovimientoInventario movimiento) {
        if (!repo.existsById(movimiento.getIdMovimientoInventario())) {
            throw new RuntimeException("Movimiento con ID " + movimiento.getIdMovimientoInventario() + " no encontrado");
        }
        return repo.save(movimiento);
    }

    @Override
    public void eliminar(Integer id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Movimiento con ID " + id + " no encontrado");
        }
        repo.deleteById(id);
    }

    @Override
    protected ICrudGenericoRepository<MovimientoInventario, Integer> getRepo() {
        return repo;
    }
}
