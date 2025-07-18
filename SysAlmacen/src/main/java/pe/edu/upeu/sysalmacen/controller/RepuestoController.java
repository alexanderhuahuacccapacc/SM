package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upeu.sysalmacen.dtos.IncrementoStockRequest;
import pe.edu.upeu.sysalmacen.dtos.RepuestoDTO;
import pe.edu.upeu.sysalmacen.mappers.RepuestoMapper;
import pe.edu.upeu.sysalmacen.model.Repuesto;
import pe.edu.upeu.sysalmacen.service.IRepuestoService;
import pe.edu.upeu.sysalmacen.service.impl.RepuestoServiceImp;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/repuesto")
@RequiredArgsConstructor
//@CrossOrigin("*")


public class RepuestoController {

    private final RepuestoServiceImp respuestoServiceiImp;
    private final IRepuestoService repuestoService ;
    private final RepuestoMapper repuestoMapper;

    @GetMapping
    public ResponseEntity<List<RepuestoDTO>> findAll() {
        List<RepuestoDTO> list = repuestoMapper.toDTOs(repuestoService.findAll());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RepuestoDTO> findById(@PathVariable("id") Long id) {
        Repuesto obj = repuestoService.findById(id);
        return ResponseEntity.ok(repuestoMapper.toDTO(obj));
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody RepuestoDTO.RepuestoCADto dto) {
        RepuestoDTO creado = repuestoService.saveD(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(creado.getIdRepuesto()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RepuestoDTO> update(@Valid @RequestBody RepuestoDTO.RepuestoCADto dto, @PathVariable("id") Long id  ) {
        RepuestoDTO actualizado = repuestoService.updateD(dto, id);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        repuestoService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/pageable")
    public ResponseEntity<org.springframework.data.domain.Page<RepuestoDTO>> listPage(Pageable pageable){
        Page<RepuestoDTO> page = repuestoService.listaPage(pageable).map(e -> repuestoMapper.toDTO(e));
        return ResponseEntity.ok(page);
    }
    @PutMapping("/incrementar-stock")
    public ResponseEntity<Void> incrementarStock(
            @RequestBody IncrementoStockRequest request) {
        respuestoServiceiImp.incrementarStock(request.getIdRepuesto(), request.getCantidad());
        return ResponseEntity.ok().build();
    }

}
