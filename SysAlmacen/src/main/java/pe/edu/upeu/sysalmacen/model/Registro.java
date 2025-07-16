package pe.edu.upeu.sysalmacen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "upeu_solicitud")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud")
    private Long idSolicitud;

    @Column(name = "codigo_repuesto", nullable = false, length = 50)
    private String codigoRepuesto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "solicitante", nullable = false, length = 100)
    private String solicitante;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "prioridad", nullable = false, length = 20)
    private String prioridad;

    @Column(name = "observaciones", length = 200)
    private String observaciones;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado = "Pendiente";
}
