package pe.edu.upeu.sysalmacen.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Bus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bus {
    @Id
    @Column(name = "id_Bus")
    private Long idBus;

    @Column(nullable = false, length = 20, name = "bu_placa")
    private String placa;

    @Column(length = 50, name = "bu_modelo")
    private String modelo;

    @Column(nullable = false, length = 30, name = "bu_estado")
    private String estado;
}
