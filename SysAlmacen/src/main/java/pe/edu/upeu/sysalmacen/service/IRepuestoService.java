package pe.edu.upeu.sysalmacen.service;

import net.sf.jasperreports.engine.JRException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import pe.edu.upeu.sysalmacen.dtos.RepuestoDTO;

import pe.edu.upeu.sysalmacen.dtos.report.RepMasVendidos;

import pe.edu.upeu.sysalmacen.model.Repuesto;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


public interface IRepuestoService extends ICrudGenericoService<Repuesto, Long>{


    RepuestoDTO saveD(RepuestoDTO.RepuestoCADto dto);
    RepuestoDTO updateD(RepuestoDTO.RepuestoCADto dto, Long id);

    public List<RepMasVendidos> obtenerRepMasVendidos();

    byte[] generateReport() throws JRException, SQLException, IOException;

    Page<Repuesto> listaPage(Pageable pageable);
}
