package pe.edu.upeu.sysalmacen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "upeu_usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "us_fecha_registro") // Quitamos nullable = false
    private LocalDate fechaRegistro;

    @Column(name = "us_nombre", length = 100) // Quitamos nullable = false
    private String nombre;

    @Column(name = "us_cargo", length = 50) // Quitamos nullable = false
    private String cargo;

    @Column(name = "us_area")
    private String area;

    @Column(name = "us_credenciales", length = 50) // Quitamos nullable = false
    private String credenciales;

    @Column(name = "username", nullable = false, unique = true, length = 20)
    private String username;

    @Column(name = "clave", nullable = false, length = 100)
    private String clave;

    @Column(name = "estado", nullable = false, length = 10)
    private String estado;
}