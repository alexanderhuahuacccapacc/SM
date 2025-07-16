package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.sysalmacen.model.Registro;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.service.IRegistroService;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistroSeviceImp extends CrudGenericoServiceImp<Registro, Long> implements IRegistroService {
    @Override
    protected ICrudGenericoRepository<Registro, Long> getRepo() {
        return null;
    }
}
