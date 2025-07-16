package pe.edu.upeu.sysalmacen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "solicitud_compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud_compra")
    private Integer idSolicitudCompra;

    @Column(nullable = false, name = "SC_CANTIDAD")
    private String cantidad;

    @Column(nullable = false, name = "SC_ESTADO")
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor proveedor;

    @ManyToOne
    @JoinColumn(name = "id_repuesto", nullable = false)
    private Repuesto repuesto;
}