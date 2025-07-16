package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pe.edu.upeu.sysalmacen.dtos.RepuestoDTO;
import pe.edu.upeu.sysalmacen.model.Repuesto;

@Mapper(componentModel = "spring")
public interface RepuestoMapper extends GenericMapper <RepuestoDTO,Repuesto> {
    /* ---------- ENTITY → DTO (GET) ---------- */
    @Override
    @Mapping(target = "categoria")   // evitamos NPE si es null
    @Mapping(target = "marca")
    @Mapping(target = "unidadMedida")
    RepuestoDTO toDTO(Repuesto entity);

    /* ---------- CADto → ENTITY (POST / PUT) ---------- */
    @Mapping(target = "categoria.idCategoria",   source = "categoria")
    @Mapping(target = "marca.idMarca",           source = "marca")
    @Mapping(target = "unidadMedida.idUnidad",   source = "unidadMedida")
    Repuesto toEntityFromCADTO(RepuestoDTO.RepuestoCADto dto);


}
