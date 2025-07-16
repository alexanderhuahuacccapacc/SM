package pe.edu.upeu.sysalmacen.mappers;

import org.mapstruct.Mapper;
import pe.edu.upeu.sysalmacen.dtos.CategoriaDTO;
import pe.edu.upeu.sysalmacen.dtos.MarcaDTO;
import pe.edu.upeu.sysalmacen.model.Categoria;
import pe.edu.upeu.sysalmacen.model.Marca;

@Mapper(componentModel = "spring")
public interface MarcaMapper extends GenericMapper<MarcaDTO, Marca> {
}
