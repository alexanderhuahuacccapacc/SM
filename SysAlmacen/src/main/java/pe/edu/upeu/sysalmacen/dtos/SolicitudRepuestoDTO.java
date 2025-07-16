package pe.edu.upeu.sysalmacen.dtos;

import lombok.Data;

import java.time.LocalDate;
@Data

public class SolicitudRepuestoDTO {
    private Long id_SolicitudRepuesto;
    private String cantidad;
    private String estado;
    private LocalDate fecha;
    private String motivo;
    private Long idUsuario;
    private Long idRepuesto;
    private Long idBus;
    private String nombre;
    private String placa;
}
