package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import pe.edu.upeu.sysalmacen.dtos.SolicitudRepuestoDTO;
import pe.edu.upeu.sysalmacen.model.Bus;
import pe.edu.upeu.sysalmacen.model.Repuesto;
import pe.edu.upeu.sysalmacen.model.SolicitudRepuesto;
import pe.edu.upeu.sysalmacen.model.Usuario;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SolicitudRepuestoMapper extends GenericMapper<SolicitudRepuestoDTO, SolicitudRepuesto> {

    @Mappings({
            @Mapping(source = "id_SolicitudRepuesto", target = "id_SolicitudRepuesto"),
            @Mapping(source = "usuario.idUsuario", target = "idUsuario"),
            @Mapping(source = "repuesto.nombre", target = "nombre"),
            @Mapping(source = "repuesto.idRepuesto", target = "idRepuesto"),
            @Mapping(source = "bus.idBus", target = "idBus"),
            @Mapping(source = "bus.placa", target = "placa") // Asegúrate de que 'bus' y 'placa' existen
    })
    SolicitudRepuestoDTO toDTO(SolicitudRepuesto entity);

    @Override
    @Mappings({
            @Mapping(source = "id_SolicitudRepuesto", target = "id_SolicitudRepuesto"),
            @Mapping(source = "idUsuario", target = "usuario"),
            @Mapping(source = "idRepuesto", target = "repuesto"),
            @Mapping(source = "idBus", target = "bus")
            // NOTA: placa no se mapea a 'bus' en reverso, salvo que tengas idBus
    })
    SolicitudRepuesto toEntity(SolicitudRepuestoDTO dto);

    @IterableMapping(elementTargetType = SolicitudRepuestoDTO.class)
    List<SolicitudRepuestoDTO> todtoList(List<SolicitudRepuesto> entities);

    // Métodos auxiliares
    default Usuario mapUsuario(Long id) {
        if (id == null) return null;
        Usuario u = new Usuario();
        u.setIdUsuario(id);
        return u;
    }

    default Repuesto mapRepuesto(Long id) {
        if (id == null) return null;
        Repuesto r = new Repuesto();
        r.setIdRepuesto(id);
        return r;
    }

    default Bus mapBus(Long id) {
        if (id == null) return null;
        Bus b = new Bus();
        b.setIdBus(id);
        return b;
    }

}
