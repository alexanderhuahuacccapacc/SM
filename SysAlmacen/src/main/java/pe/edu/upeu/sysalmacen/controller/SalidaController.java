package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.sysalmacen.dtos.CrearSalidaDTO;
import pe.edu.upeu.sysalmacen.dtos.SalidaDTO;
import pe.edu.upeu.sysalmacen.service.SalidaService;

import java.util.List;

@RestController
@RequestMapping("/api/salidas")
@RequiredArgsConstructor
public class SalidaController {

    private final SalidaService salidaService;

    @GetMapping
    public ResponseEntity<List<SalidaDTO>> findAll() {
        return ResponseEntity.ok(salidaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalidaDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(salidaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SalidaDTO> save(@Valid @RequestBody SalidaDTO dto) {
        SalidaDTO saved = salidaService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalidaDTO> update(@PathVariable Long id, @Valid @RequestBody SalidaDTO dto) {
        SalidaDTO updated = salidaService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salidaService.deleteWithStockUpdate(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/registrar")      // POST /api/salidas/registrar
    public ResponseEntity<SalidaDTO> registrarSalida(
            @Valid @RequestBody CrearSalidaDTO dto) {

        SalidaDTO salidaRegistrada =
                salidaService.registrarSalida(dto.getIdRepuesto(), dto.getCantidad(),dto.getDestinatario());

        return ResponseEntity.status(HttpStatus.CREATED).body(salidaRegistrada);
    }
    @PutMapping("/actualizar-con-stock/{id}")
    public ResponseEntity<SalidaDTO> actualizarSalidaConStock(
            @PathVariable Long id,
            @RequestBody SalidaDTO dto,
            @RequestParam Integer diferenciaStock) {

        SalidaDTO updated = salidaService.actualizarSalidaConStock(id, dto, diferenciaStock);
        return ResponseEntity.ok(updated);
    }
}

