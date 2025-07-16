package pe.edu.upeu.sysalmacen.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.model.Repuesto;
import pe.edu.upeu.sysalmacen.repository.IRepuestoRepository;

@Service
@RequiredArgsConstructor
public class StockService {

    private final IRepuestoRepository repuestoRepository;

    public void incrementarStock(Long idRepuesto, int cantidad) {
        Repuesto repuesto = repuestoRepository.findById(idRepuesto)
                .orElseThrow(() -> new RuntimeException("Repuesto no encontrado"));

        repuesto.setStockActual(repuesto.getStockActual() + cantidad);
        repuestoRepository.save(repuesto);
    }

    public int consultarStock(Long idRepuesto) {
        return repuestoRepository.findById(idRepuesto)
                .orElseThrow(() -> new RuntimeException("Repuesto no encontrado"))
                .getStockActual();
    }
}
