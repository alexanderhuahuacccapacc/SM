package pe.edu.upeu.sysalmacen.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RepuestoDTO {
    private Long idRepuesto;
    private String nombre;
    private Integer stockActual;
    private String codigo;
    private String ubicacion;
    private String estado;
    private Integer stockMinimo;
    @NotNull(message = "La categoría no puede ser nula")
    private CategoriaDTO categoria;
    @NotNull(message = "La marca no puede ser nula")
    private MarcaDTO marca;
    @NotNull(message = "La unidad de medida no puede ser nula")
    private UnidadMedidaDTO unidadMedida;



    public record RepuestoCADto(
    Long idRepuesto,
    @NotNull(message = "El nombre no puede ser nulo")
    @Size(min = 2, max = 120, message = "El nombre debe tener entre 2 y 120 caracteres")
    String nombre,
    @NotNull(message = "El stock no puede ser nulo")
    @DecimalMin(value = "0.0", inclusive = true, message = "El stock debe ser mayor o igual a 0")
    Integer stockActual,
    @NotNull(message = "El codigo no puede ser nulo")
    @NotNull(message = "El stock mínimo no puede ser nulo")
    @DecimalMin(value = "0", message = "El stock mínimo debe ser mayor o igual a 0")
    Integer stockMinimo,
    @Size(min = 2, max = 120, message = "El nombre debe tener entre 2 y 120 caracteres")
    String codigo,
    @NotNull(message = "El Ubicacion no puede ser nulo")
    @Size(min = 2, max = 120, message = "El nombre debe tener entre 2 y 120 caracteres")
    String ubicacion,
    @NotNull(message = "El estado no puede ser nulo")
    @Size(min = 2, max = 120, message = "El nombre debe tener entre 2 y 120 caracteres")
    String estado,
    @NotNull(message = "La categoría no puede ser nula")
    Long categoria,
    @NotNull(message = "La marca no puede ser nula")
    Long marca,
    @NotNull(message = "La unidad de medida no puede ser nula")
    Long unidadMedida ){ }

}
