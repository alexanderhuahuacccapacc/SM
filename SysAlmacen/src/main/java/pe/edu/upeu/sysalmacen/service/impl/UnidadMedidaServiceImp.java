package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.sysalmacen.model.UnidadMedida;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.repository.IUnidadMedidaRepository;
import pe.edu.upeu.sysalmacen.service.IUnidadMedidaService;

@Service
@Transactional
@RequiredArgsConstructor
public class UnidadMedidaServiceImp extends CrudGenericoServiceImp<UnidadMedida, Long> implements IUnidadMedidaService {

    private final IUnidadMedidaRepository repo;
    @Override
    protected ICrudGenericoRepository<UnidadMedida, Long> getRepo() {
        return repo;
    }
}
