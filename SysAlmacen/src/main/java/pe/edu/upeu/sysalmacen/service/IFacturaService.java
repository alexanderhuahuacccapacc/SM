package pe.edu.upeu.sysalmacen.service;


import pe.edu.upeu.sysalmacen.model.Factura;

import java.time.LocalDateTime;
import java.util.List;


public interface IFacturaService extends ICrudGenericoService<Factura, Integer>{
    List<Factura> findAll();
    Factura findById(Integer id);
    Factura save(Factura factura);
    Factura update(Integer id, Factura factura);
    void eliminarFactura(Integer id);
    List<Factura> findBySolicitudCompra(Integer idSolicitudCompra);
    List<Factura> findByFechaSubidaBetween(LocalDateTime inicio, LocalDateTime fin);
}
