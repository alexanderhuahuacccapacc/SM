package pe.edu.upeu.sysalmacen.service;

import pe.edu.upeu.sysalmacen.model.Marca;


public interface IMarcaService  extends ICrudGenericoService<Marca, Long> {
    Long maxID();
}