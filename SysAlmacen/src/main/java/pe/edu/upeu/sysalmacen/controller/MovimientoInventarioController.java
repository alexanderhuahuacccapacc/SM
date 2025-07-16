package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upeu.sysalmacen.dtos.MovimientoInventarioDTO;
import pe.edu.upeu.sysalmacen.mappers.MovimientoInvetarioMapper;
import pe.edu.upeu.sysalmacen.model.MovimientoInventario;
import pe.edu.upeu.sysalmacen.service.IMovimientoInventarioService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/MovimientoInventario")
@RequiredArgsConstructor
@CrossOrigin("*")

public class MovimientoInventarioController {
    private final IMovimientoInventarioService service ;
    private final MovimientoInvetarioMapper mapper;

    @GetMapping
    public ResponseEntity<List<MovimientoInventarioDTO>> listarTodos() {
        return ResponseEntity.ok(mapper.toDTOs(service.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimientoInventarioDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(mapper.toDTO(service.findById(id)));
    }

    @PostMapping
    public ResponseEntity<MovimientoInventarioDTO> registrar(@Valid @RequestBody MovimientoInventarioDTO dto) {
        MovimientoInventario entity = mapper.toEntity(dto);
        MovimientoInventario saved = service.registrar(entity);
        MovimientoInventarioDTO response = mapper.toDTO(saved);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getIdMovimientoInventario())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimientoInventarioDTO> actualizar(@PathVariable Integer id, @Valid @RequestBody MovimientoInventarioDTO dto) {
        dto.setIdMovimientoInventario(id);
        MovimientoInventario actualizado = service.update(id, mapper.toEntity(dto));
        return ResponseEntity.ok(mapper.toDTO(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
