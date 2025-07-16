package pe.edu.upeu.sysalmacen.service;

import pe.edu.upeu.sysalmacen.dtos.VentaDetalleDTO;
import pe.edu.upeu.sysalmacen.model.VentaDetalle;

public interface IVentaDetalleService extends ICrudGenericoService<VentaDetalle, Long>{
    VentaDetalleDTO saveD(VentaDetalleDTO.VentaDetalleCADTO dto);
}
