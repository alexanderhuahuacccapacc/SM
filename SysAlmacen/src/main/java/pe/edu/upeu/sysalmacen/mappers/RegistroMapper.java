package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.Mapper;
import pe.edu.upeu.sysalmacen.dtos.RegistroDTO;
import pe.edu.upeu.sysalmacen.model.Registro;

@Mapper(componentModel = "spring")
public interface RegistroMapper extends GenericMapper<RegistroDTO, Registro> {
}
