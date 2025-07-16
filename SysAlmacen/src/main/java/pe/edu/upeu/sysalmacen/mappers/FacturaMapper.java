package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.*;
import pe.edu.upeu.sysalmacen.dtos.FacturaDTO;
import pe.edu.upeu.sysalmacen.model.Factura;
import pe.edu.upeu.sysalmacen.model.SolicitudCompra;


import java.util.List;

@Mapper(componentModel = "spring")
public interface FacturaMapper extends GenericMapper<FacturaDTO, Factura> {

    @Mapping(target = "solicitudCompra", source = "idSolicitudCompra", qualifiedByName = "idToSolicitudCompra")
    @Override
    Factura toEntity(FacturaDTO dto);

    @Mapping(source = "solicitudCompra.idSolicitudCompra", target = "idSolicitudCompra")
    @Override
    FacturaDTO toDTO(Factura entity);

    @Override
    List<FacturaDTO> toDTOs(List<Factura> entities);

    @Override
    List<Factura> toEntities(List<FacturaDTO> dtos);

    @Named("idToSolicitudCompra")
    default SolicitudCompra idToSolicitudCompra(Integer id) {
        if (id == null) {
            return null;
        }
        SolicitudCompra sc = new SolicitudCompra();
        sc.setIdSolicitudCompra(id);
        return sc; // Asume que existe constructor con ID
    }
}