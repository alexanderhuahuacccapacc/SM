package pe.edu.upeu.sysalmacen.repository;

import org.springframework.stereotype.Repository;
import pe.edu.upeu.sysalmacen.model.Factura;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IFactutraRepository extends ICrudGenericoRepository <Factura, Integer>   {
    List<Factura> findBySolicitudCompraIdSolicitudCompra(Integer idSolicitudCompra);
    List<Factura> findByFechaSubidaBetween(LocalDateTime inicio, LocalDateTime fin);
}
