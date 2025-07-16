package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upeu.sysalmacen.dtos.BusDTO;
import pe.edu.upeu.sysalmacen.mappers.BusMapper;
import pe.edu.upeu.sysalmacen.model.Bus;
import pe.edu.upeu.sysalmacen.service.IBusService;


import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/bus")
@RequiredArgsConstructor
@CrossOrigin("*")

public class BusController {
    private final IBusService busService ;
    private final BusMapper busMapper;

    @GetMapping
    public ResponseEntity<List<BusDTO>> listarTodos() {
        return ResponseEntity.ok(busMapper.toDTOs(busService.findAll()));
    }

    @GetMapping("/{placaBus}")
    public ResponseEntity<BusDTO> obtenerPorId(@PathVariable String placaBus) {
        return ResponseEntity.ok(busMapper.toDTO(busService.findById(placaBus)));
    }

    @PostMapping
    public ResponseEntity<Void> crear(@Valid @RequestBody BusDTO dto) {
        Bus creado = busService.save(busMapper.toEntity(dto));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{placa}")
                .buildAndExpand(creado.getPlaca())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{placaBus}")
    public ResponseEntity<BusDTO> actualizar(@PathVariable String placaBus, @Valid @RequestBody BusDTO dto) {
        dto.setPlaca(placaBus);
        Bus actualizado = busService.update(placaBus, busMapper.toEntity(dto));
        return ResponseEntity.ok(busMapper.toDTO(actualizado));
    }

    @DeleteMapping("/{placaBus}")
    public ResponseEntity<Void> eliminar(@PathVariable String placaBus) {
        busService.delete(placaBus);
        return ResponseEntity.noContent().build();
    }
    //placa ya no id
}
