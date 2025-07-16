package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.model.Bus;
import pe.edu.upeu.sysalmacen.repository.IBusRepository;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.service.IBusService;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BusServiceImp extends CrudGenericoServiceImp<Bus, String> implements IBusService {
    private final IBusRepository repo;
    @Override
    protected ICrudGenericoRepository<Bus, String> getRepo() {
        return repo;
    }
    @Override
    public List<Bus> listarTodos() {
        return repo.findAll();
    }

    @Override
    public Optional<Bus> buscarPorId(String id) {
        return repo.findById(id);
    }

    @Override
    public Bus registrar(Bus bus) {
        // Validaciones adicionales pueden ir aquí
        if (bus.getPlaca() == null || bus.getPlaca().isEmpty()) {
            throw new IllegalArgumentException("La placa del bus es requerida");
        }
        return repo.save(bus);
    }

    @Override
    public Bus actualizar(Bus bus) {
        // Verificar existencia primero
        if (!repo.existsById(bus.getPlaca())) {
            throw new RuntimeException("Bus con placa " + bus.getPlaca() + " no encontrado");
        }
        return repo.save(bus);
    }

    @Override
    public void eliminar(String placa) {
        if (!repo.existsById(placa)) {
            throw new RuntimeException("Bus con placa " + placa + " no encontrado");
        }
        repo.deleteById(placa);
    }

    @Override
    public List<Bus> buscarPorModelo(String modelo) {
        return List.of();
    }

    @Override
    public List<Bus> buscarPorEstado(String estado) {
        return List.of();
    }


}
