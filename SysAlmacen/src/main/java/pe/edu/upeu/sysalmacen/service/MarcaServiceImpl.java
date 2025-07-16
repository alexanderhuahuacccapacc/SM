package pe.edu.upeu.sysalmacen.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.exception.CustomResponse;
import pe.edu.upeu.sysalmacen.exception.ModelNotFoundException;
import pe.edu.upeu.sysalmacen.model.Marca;
import pe.edu.upeu.sysalmacen.repository.IMarcaRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service("marcaServiceB")
@RequiredArgsConstructor
public class MarcaServiceImpl implements IMarcaService {

    private final IMarcaRepository repository;

    @Override
    public Marca save(Marca t) {
        return repository.save(t);
    }
    @Override
    public Marca update(Long id, Marca t) {
        repository.findById(id).orElseThrow(() -> new
                ModelNotFoundException("ID NOT FOUND: " + id));
        return repository.save(t);
    }
    @Override
    public List<Marca> findAll() {
        return repository.findAll();
    }
    @Override
    public Marca findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new
                ModelNotFoundException("ID NOT FOUND: " + id));
    }
    @Override
    public CustomResponse delete(Long id) {
        repository.findById(id).orElseThrow(() -> new
                ModelNotFoundException("ID NOT FOUND: " + id));
        repository.deleteById(id);
        CustomResponse cer=new CustomResponse();
        cer.setStatusCode(200);
        cer.setDatetime(LocalDateTime.now());
        cer.setMessage("true");
        cer.setDetails("Todo Ok");
        return cer;
    }

    @Override
    public Long maxID() {
        return repository.maxID().get();
    }
}
