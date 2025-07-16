package pe.edu.upeu.sysalmacen.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.upeu.sysalmacen.dtos.RepuestoDTO;

import pe.edu.upeu.sysalmacen.dtos.report.RepMasVendidos;

import pe.edu.upeu.sysalmacen.exception.StockInsuficienteException;
import pe.edu.upeu.sysalmacen.mappers.RepuestoMapper;
import pe.edu.upeu.sysalmacen.model.*;
import pe.edu.upeu.sysalmacen.repository.*;
import pe.edu.upeu.sysalmacen.service.IRepuestoService;

import javax.sql.DataSource;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class RepuestoServiceImp extends CrudGenericoServiceImp<Repuesto, Long> implements IRepuestoService {

    @Autowired
    private DataSource dataSource;
    private final IRepuestoRepository repo;
    private final RepuestoMapper repuestoMapper;
    private final ICategoriaRepository categoriaRepository;
    private final IMarcaRepository marcaRepository;
    private final IUnidadMedidaRepository unidadMedidaRepository;
    @Override
    protected ICrudGenericoRepository<Repuesto, Long> getRepo() {
        return repo;
    }
    @Override
    public RepuestoDTO saveD(RepuestoDTO.RepuestoCADto dto) {
        Repuesto repuesto = repuestoMapper.toEntityFromCADTO(dto);
        Categoria categoria =categoriaRepository.findById(dto.categoria())
                .orElseThrow(() -> new EntityNotFoundException("Categoria no encontrada"));

        Marca marca = marcaRepository.findById(dto.marca())
                .orElseThrow(() -> new EntityNotFoundException("Marca no encontrada"));

        UnidadMedida unidadMedida =
                unidadMedidaRepository.findById(dto.unidadMedida())
                        .orElseThrow(() -> new EntityNotFoundException("Unidad de medida no encontrada"));
        repuesto.setCategoria(categoria);
        repuesto.setCategoria(categoria);
        repuesto.setMarca(marca);
        repuesto.setUnidadMedida(unidadMedida);
        Repuesto productoGuardado = repo.save(repuesto);

        return repuestoMapper.toDTO(productoGuardado);
    }
    @Override
    public RepuestoDTO updateD(RepuestoDTO.RepuestoCADto dto, Long id) {
        Repuesto repuesto = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        Repuesto repuestox = repuestoMapper.toEntityFromCADTO(dto);
        repuestox.setIdRepuesto(repuesto.getIdRepuesto());
        Categoria categoria =categoriaRepository.findById(dto.categoria())
                .orElseThrow(() -> new EntityNotFoundException("Categoria no encontrada"));

        Marca marca = marcaRepository.findById(dto.marca())
                .orElseThrow(() -> new EntityNotFoundException("Marca no encontrada"));

        UnidadMedida unidadMedida =unidadMedidaRepository.findById(dto.unidadMedida())
                .orElseThrow(() -> new EntityNotFoundException("Unidad de medida no encontrada"));
        repuestox.setCategoria(categoria);
        repuestox.setCategoria(categoria);
        repuestox.setMarca(marca);
        repuestox.setUnidadMedida(unidadMedida);
        Repuesto repuestoActualizado = repo.save(repuestox);
        return repuestoMapper.toDTO(repuestoActualizado);
    }

    public List<RepMasVendidos> obtenerRepMasVendidos(){
        return repo.findRepMasVendidos();
    }

    public byte[] generateReport() throws JRException, SQLException, IOException {
        HashMap<String, Object> param = new HashMap<>();
        param.put("txt_title", "SysAlmacen DMP");

        File jrxmlFile = new ClassPathResource("/reports/venta_productos.jrxml").getFile();
        JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlFile.getPath());
        // Llenar el informe
        JasperPrint jprint = JasperFillManager.fillReport(jasperReport, param, dataSource.getConnection());
        byte[] pdfBytes = JasperExportManager.exportReportToPdf(jprint);
        String projectRootPath = System.getProperty("user.dir"); // Obtiene la ruta raíz del proyecto
        String outputPath = projectRootPath + "/reporte.pdf"; // Ruta del archivo dentro de la carpeta raíz
        JasperExportManager.exportReportToPdfFile(jprint, outputPath);
        // Exportar el informe a un byte[]
        return pdfBytes;
    }

    public Page<Repuesto> listaPage(Pageable pageable){
        return repo.findAll(pageable);
    }

    public void validarStock(Long idRepuesto, Integer cantidad) {
        Repuesto repuesto = findById(idRepuesto);
        if (repuesto.getStockActual() < cantidad) {
            throw new StockInsuficienteException(
                    "Stock insuficiente. Disponible: " + repuesto.getStockActual()
            );
        }
    }

}