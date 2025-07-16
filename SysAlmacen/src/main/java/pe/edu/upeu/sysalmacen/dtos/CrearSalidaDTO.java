package pe.edu.upeu.sysalmacen.dtos;

import lombok.Data;

@Data
public class CrearSalidaDTO {
    private Long idRepuesto;
    private Integer cantidad;
    private String destinatario;
    private String codigo;
}
