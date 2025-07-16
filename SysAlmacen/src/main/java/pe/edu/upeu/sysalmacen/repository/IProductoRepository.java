package pe.edu.upeu.sysalmacen.repository;

import org.springframework.data.jpa.repository.Query;
import pe.edu.upeu.sysalmacen.dtos.report.ProdMasVendidosDTO;
import pe.edu.upeu.sysalmacen.model.Producto;

import java.util.List;

public interface IProductoRepository extends ICrudGenericoRepository<Producto, Long>{
    @Query(value = "CALL productosMasVendidos()", nativeQuery = true)
    List<ProdMasVendidosDTO> findProductosMasVendidos();

}
