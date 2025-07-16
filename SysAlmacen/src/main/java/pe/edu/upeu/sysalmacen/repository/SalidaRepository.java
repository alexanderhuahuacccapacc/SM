package pe.edu.upeu.sysalmacen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.edu.upeu.sysalmacen.model.Salida;

import java.util.List;

public interface SalidaRepository extends JpaRepository<Salida, Long> {

    @Query("SELECT s FROM Salida s JOIN FETCH s.repuesto")
    List<Salida> findAllWithRepuesto();

}
