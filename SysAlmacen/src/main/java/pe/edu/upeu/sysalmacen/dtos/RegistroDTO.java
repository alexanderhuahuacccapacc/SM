package pe.edu.upeu.sysalmacen.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroDTO {
    private Long idSolicitud;
    private String titulo;
    private LocalDate fecha;
    private String mecanico;
    private String prioridad; // Alta, Media, Baja
    private String estado;
}
