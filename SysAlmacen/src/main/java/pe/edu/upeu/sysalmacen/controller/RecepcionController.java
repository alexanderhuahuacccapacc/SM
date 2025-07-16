package pe.edu.upeu.sysalmacen.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.sysalmacen.dtos.RecepcionDTO;
import pe.edu.upeu.sysalmacen.mappers.RecepcionMapper;
import pe.edu.upeu.sysalmacen.model.Recepcion;
import pe.edu.upeu.sysalmacen.service.RecepcionService;

import java.util.List;

@RestController
@RequestMapping("/api/recepciones")
@RequiredArgsConstructor
public class RecepcionController {

    private final RecepcionService recepcionService;

    @GetMapping
    public ResponseEntity<List<RecepcionDTO>> getRecepciones() {
        return ResponseEntity.ok(recepcionService.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecepcionDTO> getRecepcion(@PathVariable Long id) {
        return ResponseEntity.ok(recepcionService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<RecepcionDTO> create(@RequestBody RecepcionDTO dto) {
        return ResponseEntity.ok(recepcionService.guardarRecepcion(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecepcionDTO> update(@PathVariable Long id, @RequestBody RecepcionDTO dto) {
        return ResponseEntity.ok(recepcionService.actualizarRecepcion(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        recepcionService.eliminarRecepcion(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/validar")
    public ResponseEntity<Void> validar(@PathVariable Long id) {
        recepcionService.validarRecepcion(id);
        return ResponseEntity.noContent().build();
    }
}


