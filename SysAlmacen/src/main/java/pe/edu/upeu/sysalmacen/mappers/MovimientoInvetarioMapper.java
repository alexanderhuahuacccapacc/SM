package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import pe.edu.upeu.sysalmacen.dtos.MovimientoInventarioDTO;
import pe.edu.upeu.sysalmacen.model.MovimientoInventario;
import pe.edu.upeu.sysalmacen.model.Repuesto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MovimientoInvetarioMapper extends GenericMapper <MovimientoInventarioDTO, MovimientoInventario> {

    @Mapping(target = "repuesto", source = "idRepuesto", qualifiedByName = "idToRepuesto")
    MovimientoInventario toEntity(MovimientoInventarioDTO dto);

    @Mapping(source = "repuesto.idRepuesto", target = "idRepuesto")
    MovimientoInventarioDTO toDTO(MovimientoInventario entity);



    @Named("idToRepuesto")
    default Repuesto idToRepuesto(Long id) {
        if (id == null) return null;
        Repuesto r = new Repuesto();
        r.setIdRepuesto(id);
        return r;
    }

}
