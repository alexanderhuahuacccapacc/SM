package pe.edu.upeu.sysalmacen.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.upeu.sysalmacen.model.Repuesto;
import pe.edu.upeu.sysalmacen.repository.IRepuestoRepository;

@Component
@RequiredArgsConstructor
public class RepuestoMapperHelper {

    private final IRepuestoRepository repuestoRepository;

    public Repuesto fromId(Long idRepuesto) {
        if (idRepuesto == null) {
            return null;
        }
        return repuestoRepository.findById(idRepuesto)
                .orElseThrow(() -> new IllegalArgumentException("No existe repuesto con id: " + idRepuesto));
    }

    public Long toId(Repuesto repuesto) {
        return repuesto != null ? repuesto.getIdRepuesto() : null;
    }
}

