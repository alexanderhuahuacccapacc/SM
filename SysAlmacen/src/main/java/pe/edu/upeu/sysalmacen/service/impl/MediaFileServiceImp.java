package pe.edu.upeu.sysalmacen.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.upeu.sysalmacen.model.MediaFile;
import pe.edu.upeu.sysalmacen.repository.ICrudGenericoRepository;
import pe.edu.upeu.sysalmacen.repository.IMediaFileRepository;
import pe.edu.upeu.sysalmacen.service.IMediaFileService;

@Service
@RequiredArgsConstructor
public class MediaFileServiceImp extends CrudGenericoServiceImp<MediaFile, Long> implements IMediaFileService {
    private final IMediaFileRepository repo;

    @Override
    protected ICrudGenericoRepository<MediaFile, Long> getRepo() {
        return repo;
    }
}