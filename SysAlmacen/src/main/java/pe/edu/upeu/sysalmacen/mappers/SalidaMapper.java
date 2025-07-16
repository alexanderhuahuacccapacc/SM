package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pe.edu.upeu.sysalmacen.dtos.SalidaDTO;
import pe.edu.upeu.sysalmacen.model.Salida;

import java.util.List;

@Mapper(componentModel = "spring", uses = {RepuestoMapperHelper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SalidaMapper {

    // Entidad a DTO
    @Mapping(source = "id", target = "id")
    @Mapping(source = "repuesto.idRepuesto", target = "idRepuesto")
    @Mapping(source = "repuesto.nombre", target = "nombreRepuesto") // corregido
    @Mapping(source = "cantidadEntregada", target = "cantidadEntregada")
    @Mapping(source = "destinatario", target = "destinatario")
    @Mapping(source = "codigo", target = "codigo")
    @Mapping(source = "fechaSalida", target = "fechaSalida")
    @Mapping(source = "estado", target = "estado")
    SalidaDTO toDto(Salida entity);

    // DTO a entidad
    @Mapping(source = "id", target = "id")
    @Mapping(source = "idRepuesto", target = "repuesto") // requiere helper
    @Mapping(source = "cantidadEntregada", target = "cantidadEntregada")
    @Mapping(source = "destinatario", target = "destinatario")
    @Mapping(source = "codigo", target = "codigo")
    @Mapping(source = "fechaSalida", target = "fechaSalida")
    @Mapping(source = "estado", target = "estado")
    Salida toEntity(SalidaDTO dto);

    @IterableMapping(elementTargetType = SalidaDTO.class)
    List<SalidaDTO> toDtoList(List<Salida> entities);
}


