package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.sysalmacen.model.Cliente;
import pe.edu.upeu.sysalmacen.repository.IClienteRepository;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.service.IClienteService;

@Service
@Transactional
@RequiredArgsConstructor
public class ClienteServiceImp extends CrudGenericoServiceImp<Cliente, String> implements IClienteService {

    private final IClienteRepository repo;
    @Override
    protected ICrudGenericoRepository<Cliente, String> getRepo(){
        return repo;
    }

}
