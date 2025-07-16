package pe.edu.upeu.sysalmacen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;

@Entity
@Table(name = "MovimientoInventario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoInventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name= "id_MovimientoInventario")
    private Integer idMovimientoInventario;

    @Column(nullable = false, name= "mo_tipo")
    private String tipo;

    @Column(nullable = false, name= "mo_cantidad")
    private String cantidad;

    @Column(nullable = false, name= "mo_fecha")
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_repuesto", nullable = false)
    private Repuesto repuesto;
}