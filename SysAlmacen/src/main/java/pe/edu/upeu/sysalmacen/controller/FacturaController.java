package pe.edu.upeu.sysalmacen.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upeu.sysalmacen.dtos.FacturaDTO;
import pe.edu.upeu.sysalmacen.mappers.FacturaMapper;
import pe.edu.upeu.sysalmacen.model.Factura;
import pe.edu.upeu.sysalmacen.repository.ISolicitudCompraRepository;
import pe.edu.upeu.sysalmacen.service.IFacturaService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/factura")
@RequiredArgsConstructor
@CrossOrigin("*")

public class FacturaController {
    private final IFacturaService facturaService ;
    private final FacturaMapper facturaMapper;
    private final ISolicitudCompraRepository solicitudCompraRepository;

    @GetMapping
    public ResponseEntity<List<FacturaDTO>> listarTodos() {
        return ResponseEntity.ok(facturaMapper.toDTOs(facturaService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacturaDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(facturaMapper.toDTO(facturaService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<FacturaDTO> crear(@Valid @RequestBody FacturaDTO dto) {
        // Validar existencia de la solicitud de compra
        if (dto.getIdSolicitudCompra() != null &&
                !solicitudCompraRepository.existsById(dto.getIdSolicitudCompra())) {
            return ResponseEntity.badRequest()
                    .body(null); // o podrías devolver un DTO con mensaje de error
        }

        Factura factura = facturaMapper.toEntity(dto);
        Factura facturaCreada = facturaService.save(factura);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(facturaCreada.getIdFactura())
                .toUri();

        return ResponseEntity.created(location).body(facturaMapper.toDTO(facturaCreada));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacturaDTO> actualizar(@PathVariable Integer id, @Valid @RequestBody FacturaDTO dto) {
        dto.setIdFactura(id);
        Factura actualizado = facturaService.update(id, facturaMapper.toEntity(dto));
        return ResponseEntity.ok(facturaMapper.toDTO(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        facturaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
