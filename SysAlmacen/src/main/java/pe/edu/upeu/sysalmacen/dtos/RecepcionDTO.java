package pe.edu.upeu.sysalmacen.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class RecepcionDTO {

    private Long id;

    @NotNull(message = "Debe seleccionar un repuesto")
    private Long idRepuesto;

    private String repuesto; // este se llenará solo desde backend, no requiere validación

    @Min(value = 1, message = "La cantidad recibida debe ser al menos 1")
    private int cantidadRecibida;

    @NotBlank(message = "El proveedor no puede estar vacío")
    private String proveedor;

    @NotBlank(message = "El código no puede estar vacío")
    private String codigo;

    @NotNull(message = "La fecha de recepción es obligatoria")
    private LocalDate fechaRecepcion;

    @NotBlank(message = "El estado no puede estar vacío")
    private String estado;

    @NotBlank(message = "El estado no puede estar vacío")
    private String nombreRepuesto;
}
