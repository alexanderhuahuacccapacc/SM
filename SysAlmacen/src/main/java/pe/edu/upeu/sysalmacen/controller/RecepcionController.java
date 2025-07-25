package pe.edu.upeu.sysalmacen.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pe.edu.upeu.sysalmacen.dtos.RecepcionDTO;
import pe.edu.upeu.sysalmacen.mappers.RecepcionMapper;
import pe.edu.upeu.sysalmacen.model.Recepcion;
import pe.edu.upeu.sysalmacen.service.RecepcionService;
import pe.edu.upeu.sysalmacen.service.impl.RepuestoServiceImp;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recepciones")
@RequiredArgsConstructor
public class RecepcionController {

    private final RecepcionService recepcionService;
    private final RepuestoServiceImp repuestoService;
    private final RecepcionMapper  recepcionMapper;
    private static final List<String> ESTADOS_PERMITIDOS = List.of("PENDIENTE", "RECIBIDO", "VALIDADA");

    @GetMapping
    public ResponseEntity<List<RecepcionDTO>> getRecepciones() {
        return ResponseEntity.ok(recepcionService.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecepcionDTO> getRecepcion(@PathVariable Long id) {
        return ResponseEntity.ok(recepcionService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<RecepcionDTO> guardarRecepcion(@RequestBody RecepcionDTO dto) {
        return ResponseEntity.ok(recepcionService.guardarRecepcion(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecepcionDTO> actualizarRecepcion(@PathVariable Long id, @RequestBody RecepcionDTO dto) {
        return ResponseEntity.ok(recepcionService.actualizarRecepcion(id, dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        recepcionService.eliminarRecepcion(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/validar")
    public ResponseEntity<Void> validar(@PathVariable Long id) {
        RecepcionDTO recepcion = recepcionService.obtenerPorId(id);
        recepcionService.validarRecepcion(id);

        // Incrementar stock al validar la recepción
        repuestoService.incrementarStock(recepcion.getIdRepuesto(), recepcion.getCantidadRecibida());

        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Void> cambiarEstado(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String nuevoEstado = body.get("estado");

        if (!ESTADOS_PERMITIDOS.contains(nuevoEstado)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estado no válido");
        }

        recepcionService.cambiarEstado(id, nuevoEstado);
        return ResponseEntity.noContent().build();
    }
}
//CONTROLLER_PUT ARREGLAR

