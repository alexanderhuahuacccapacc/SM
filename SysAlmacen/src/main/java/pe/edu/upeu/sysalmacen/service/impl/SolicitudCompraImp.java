package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.dtos.SolicitudCompraDTO;
import pe.edu.upeu.sysalmacen.mappers.SolicitudCompraMapper;
import pe.edu.upeu.sysalmacen.model.SolicitudCompra;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.repository.ISolicitudCompraRepository;
import pe.edu.upeu.sysalmacen.service.ISolicitudCompraService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SolicitudCompraImp extends CrudGenericoServiceImp<SolicitudCompra, Integer> implements ISolicitudCompraService {

    private final ISolicitudCompraRepository repo;
    private final SolicitudCompraMapper mapper;

    @Override
    public List<SolicitudCompra> listar() {
        return repo.findAll();
    }

    @Override
    public List<SolicitudCompraDTO> listarDto() {
        return repo.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<SolicitudCompra> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    @Override
    public SolicitudCompra registrar(SolicitudCompra solicitud) {
        return repo.save(solicitud);
    }

    @Override
    public SolicitudCompra actualizar(SolicitudCompra solicitud) {
        if (!repo.existsById(solicitud.getIdSolicitudCompra())) {
            throw new RuntimeException("Solicitud de compra no encontrada con ID: " + solicitud.getIdSolicitudCompra());
        }
        return repo.save(solicitud);
    }

    @Override
    public void eliminar(Integer id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Solicitud de compra no encontrada con ID: " + id);
        }
        repo.deleteById(id);
    }

    @Override
    protected ICrudGenericoRepository<SolicitudCompra, Integer> getRepo() {
        return repo;
    }
}
