package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upeu.sysalmacen.dtos.RegistroDTO;
import pe.edu.upeu.sysalmacen.mappers.RegistroMapper;
import pe.edu.upeu.sysalmacen.model.Registro;
import pe.edu.upeu.sysalmacen.service.IRegistroService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/registros")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RegistroController {
    private final IRegistroService registroService;
    private final RegistroMapper registroMapper;

    @GetMapping
    public ResponseEntity<List<RegistroDTO>> listarTodos() {
        List<RegistroDTO> lista = registroMapper.toDTOs(registroService.findAll());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroDTO> obtenerPorId (@PathVariable Long id) {
        Registro entity = registroService.findById(id);
        return ResponseEntity.ok(registroMapper.toDTO(entity));
    }

    @PostMapping
    public ResponseEntity<Void> crear(@Valid @RequestBody RegistroDTO dto) {
        Registro entity = registroMapper.toEntity(dto);
        Registro creado = registroService.save(entity);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(creado.getIdSolicitud())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroDTO> actualizar(@PathVariable Long id,
                                                  @Valid @RequestBody RegistroDTO dto) {
        dto.setIdSolicitud(id);
        Registro actualizado = registroService.update(id, registroMapper.toEntity(dto));
        return ResponseEntity.ok(registroMapper.toDTO(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        registroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}