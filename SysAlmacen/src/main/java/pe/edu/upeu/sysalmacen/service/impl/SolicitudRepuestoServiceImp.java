package pe.edu.upeu.sysalmacen.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.dtos.SolicitudRepuestoDTO;
import pe.edu.upeu.sysalmacen.mappers.SolicitudRepuestoMapper;
import pe.edu.upeu.sysalmacen.model.SolicitudRepuesto;
import pe.edu.upeu.sysalmacen.repository.*;
import pe.edu.upeu.sysalmacen.service.ISolicitudRepuestoService;

@Service
@RequiredArgsConstructor
public class SolicitudRepuestoServiceImp extends CrudGenericoServiceImp<SolicitudRepuesto, Long> implements ISolicitudRepuestoService {

    private final ISolicitudRepuestoRepository repo;
    private final IUsuarioRepository usuarioRepo;
    private final IBusRepository busRepo;
    private final IRepuestoRepository repuestoRepo;
    private final SolicitudRepuestoMapper repuestoMapper;

    public Page<SolicitudRepuesto> listarPageable(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public SolicitudRepuesto save(SolicitudRepuestoDTO dto) {
        SolicitudRepuesto solicitud = new SolicitudRepuesto();

        solicitud.setUsuario(usuarioRepo.findById(dto.getIdUsuario())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado")));

        solicitud.setRepuesto(repuestoRepo.findByNombre(dto.getNombre())
                .orElseThrow(() -> new EntityNotFoundException("Repuesto no encontrado")));

        solicitud.setBus(busRepo.findById(dto.getPlaca())
                .orElseThrow(() -> new EntityNotFoundException("Bus no encontrado")));

        return repo.save(solicitud);
    }

    @Override
    protected ICrudGenericoRepository<SolicitudRepuesto, Long> getRepo() {
        return repo;
    }
}
