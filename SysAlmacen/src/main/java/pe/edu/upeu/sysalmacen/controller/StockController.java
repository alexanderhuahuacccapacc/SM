package pe.edu.upeu.sysalmacen.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.sysalmacen.service.StockService;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping("/{idRepuesto}")
    public ResponseEntity<Integer> consultarStock(@PathVariable Long idRepuesto) {
        int stock = stockService.consultarStock(idRepuesto);
        return ResponseEntity.ok(stock);
    }


}

