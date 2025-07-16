package pe.edu.upeu.sysalmacen.service;


import pe.edu.upeu.sysalmacen.dtos.VentaDTO;
import pe.edu.upeu.sysalmacen.model.Venta;

public interface IVentaService extends ICrudGenericoService<Venta, Long>{
    VentaDTO saveD(VentaDTO.VentaCADTO dto);
}
