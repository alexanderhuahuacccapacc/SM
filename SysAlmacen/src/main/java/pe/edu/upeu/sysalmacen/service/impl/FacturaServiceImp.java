package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.exception.CustomResponse;
import pe.edu.upeu.sysalmacen.model.Factura;
import pe.edu.upeu.sysalmacen.repository.IFactutraRepository;
import pe.edu.upeu.sysalmacen.repository.ISolicitudCompraRepository;
import pe.edu.upeu.sysalmacen.service.IFacturaService;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FacturaServiceImp implements IFacturaService {

    private final IFactutraRepository facturaRepository;
    private final ISolicitudCompraRepository solicitudCompraRepository;

    @Override
    public List<Factura> findAll() {
        return facturaRepository.findAll();
    }

    @Override
    public Factura findById(Integer id) {
        return facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada con ID: " + id));
    }

    @Override
    public CustomResponse delete(Integer integer) {
        return null;
    }

    @Override
    public Factura save(Factura factura) {
        // Validar que la solicitud de compra esté completa
        if (factura.getSolicitudCompra() == null || factura.getSolicitudCompra().getIdSolicitudCompra() == null) {
            throw new IllegalArgumentException("Se requiere una solicitud de compra válida");
        }

        // Validar archivo PDF
        if (factura.getArchivoPdf() == null || !factura.getArchivoPdf().toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Se requiere un archivo PDF válido");
        }

        // Establecer fecha si no existe
        if (factura.getFechaSubida() == null) {
            factura.setFechaSubida(LocalDateTime.now());
        }

        return facturaRepository.save(factura);
    }

    @Override
    public Factura update(Integer id, Factura factura) {
        if (!facturaRepository.existsById(id)) {
            throw new RuntimeException("Factura no encontrada con ID: " + id);
        }

        factura.setIdFactura(id);
        return facturaRepository.save(factura);
    }

    @Override
    public void eliminarFactura (Integer id) {
        if (!facturaRepository.existsById(id)) {
            throw new RuntimeException("Factura no encontrada con ID: " + id);
        }
        facturaRepository.deleteById(id);
    }

    @Override
    public List<Factura> findBySolicitudCompra(Integer idSolicitudCompra) {
        return facturaRepository.findBySolicitudCompraIdSolicitudCompra(idSolicitudCompra);
    }

    @Override
    public List<Factura> findByFechaSubidaBetween(LocalDateTime inicio, LocalDateTime fin) {
        return facturaRepository.findByFechaSubidaBetween(inicio, fin);
    }
}