package pe.edu.upeu.sysalmacen.service;


import pe.edu.upeu.sysalmacen.dtos.VentCarritoDTO;
import pe.edu.upeu.sysalmacen.model.VentCarrito;

import java.util.List;

public interface IVentCarritoService extends ICrudGenericoService<VentCarrito, Long>{

    VentCarritoDTO saveD(VentCarritoDTO.VentCarritoCADTO dto);
    VentCarritoDTO updateD(VentCarritoDTO.VentCarritoCADTO dto, Long id);
    List<VentCarrito> listaCarritoCliente(String dniruc);

    void deleteCarAll(String dniruc);
}
