package pe.edu.upeu.sysalmacen.dtos;

import lombok.Data;

import java.time.LocalDate;
@Data
public class MovimientoInventarioDTO {
    private Integer idMovimientoInventario;
    private String tipo;
    private String cantidad;
    private LocalDate fecha;
    private Long idRepuesto;
}
