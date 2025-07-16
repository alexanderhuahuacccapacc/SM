package pe.edu.upeu.sysalmacen.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalidaDTO {
    private Long id;

    @NotNull(message = "El ID del repuesto es obligatorio")
    private Long idRepuesto;

    private String nombreRepuesto;

    private Integer cantidadEntregada;

    private String destinatario;

    private String codigo;

    private LocalDate fechaSalida;

    private String estado;

}
