package pe.edu.upeu.sysalmacen.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data

public class FacturaDTO {
    private Integer idFactura;
    private String archivoPdf;
    private LocalDateTime fechaSubida;
    private Integer idSolicitudCompra;
}
