package pe.edu.upeu.sysalmacen.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "salidas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Salida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_salida")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_repuesto", nullable = false)
    private Repuesto repuesto;

    @Min(1)
    @Column(name = "cantidad_entregada")
    private Integer cantidadEntregada;

    @Column(name = "destinatario", length = 100)
    private String destinatario;

    @Column(name = "codigo", length = 20)
    private String codigo;

    @Column(name = "fecha_salida")
    private LocalDate fechaSalida;

    @Column(name = "estado", length = 20)
    private String estado;


}



