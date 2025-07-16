package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upeu.sysalmacen.dtos.SolicitudCompraDTO;
import pe.edu.upeu.sysalmacen.mappers.SolicitudCompraMapper;
import pe.edu.upeu.sysalmacen.model.SolicitudCompra;
import pe.edu.upeu.sysalmacen.service.ISolicitudCompraService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudcompra")
@RequiredArgsConstructor
public class SolicitudCompraController {

    private final ISolicitudCompraService solicitudCompraService;
    private final SolicitudCompraMapper solicitudCompraMapper;

    // GET: Listar todas las solicitudes
    @GetMapping
    public ResponseEntity<List<SolicitudCompraDTO>> listar() {
        List<SolicitudCompra> lista = solicitudCompraService.findAll();
        List<SolicitudCompraDTO> listaDto = solicitudCompraMapper.toDtoList(lista);
        return ResponseEntity.ok(listaDto);
    }

    // GET: Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudCompraDTO> buscarPorId(@PathVariable Integer id) {
        SolicitudCompra entity = solicitudCompraService.findById(id);
        return ResponseEntity.ok(solicitudCompraMapper.toDTO(entity));
    }

    // POST: Registrar
    @PostMapping
    public ResponseEntity<Void> registrar(@Valid @RequestBody SolicitudCompraDTO dto) {
        SolicitudCompra entity = solicitudCompraMapper.toEntity(dto);
        SolicitudCompra creado = solicitudCompraService.registrar(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(creado.getIdSolicitudCompra()).toUri();
        return ResponseEntity.created(location).build();
    }

    // PUT: Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<SolicitudCompraDTO> actualizar(@PathVariable Integer id,
                                                         @Valid @RequestBody SolicitudCompraDTO dto) {
        dto.setIdSolicitudCompra(id);
        SolicitudCompra actualizado = solicitudCompraService.update(id, solicitudCompraMapper.toEntity(dto));
        return ResponseEntity.ok(solicitudCompraMapper.toDTO(actualizado));
    }

    // DELETE: Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        solicitudCompraService.delete(id);
        return ResponseEntity.noContent().build();
    }

}