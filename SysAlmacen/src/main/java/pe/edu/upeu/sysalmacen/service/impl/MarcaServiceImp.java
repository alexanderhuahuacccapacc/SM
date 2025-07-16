package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.sysalmacen.model.Marca;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.repository.IMarcaRepository;
import pe.edu.upeu.sysalmacen.service.IMarcaService;

import java.util.Optional;

@Primary
@Service("marcaServiceA")
@Transactional
@RequiredArgsConstructor
public class MarcaServiceImp extends CrudGenericoServiceImp<Marca, Long> implements IMarcaService {
    private final IMarcaRepository repo;

    @Override
    protected ICrudGenericoRepository<Marca, Long> getRepo(){
        return repo;
    }

    @Override
    public Long maxID() {
        return repo.maxID().get();
    }
}
