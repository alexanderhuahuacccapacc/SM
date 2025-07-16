package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pe.edu.upeu.sysalmacen.dtos.BusDTO;
import pe.edu.upeu.sysalmacen.model.Bus;

@Mapper(componentModel = "spring")
public interface BusMapper extends GenericMapper<BusDTO,Bus>{
    @Mapping(target = "placa", source = "placa")
    @Mapping(target = "modelo", source = "modelo")
    @Mapping(target = "estado", source = "estado")
    Bus toEntity(BusDTO dto);

}
