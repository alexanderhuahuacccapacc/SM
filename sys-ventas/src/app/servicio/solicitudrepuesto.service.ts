import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SolicitudRepuesto } from '../modelo/SolicitudRepuesto';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudRepuestoService {
  private readonly url = `${environment.HOST}/api/solicitudRepuesto`;

  private solicitudesSubject = new Subject<SolicitudRepuesto[]>();
  private messageSubject = new BehaviorSubject<string>('');
  private solicitudSeleccionadaSubject = new BehaviorSubject<SolicitudRepuesto | null>(null);

  solicitudSeleccionada$ = this.solicitudSeleccionadaSubject.asObservable();

  constructor(private http: HttpClient) {}

  // === GET: Listar paginable
  listPageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  // === GET: Todas las solicitudes
  findAllOT(): void {
    this.http.get<SolicitudRepuesto[]>(this.url).pipe(
      tap(solicitudes => this.solicitudesSubject.next(solicitudes))
    ).subscribe();
  }

  // === GET: Observable de solicitudes (Subject)
  getSolicitudes$(): Observable<SolicitudRepuesto[]> {
    return this.solicitudesSubject.asObservable();
  }

  // === POST: Crear nueva solicitud
  createSolicitud(dto: SolicitudRepuesto): Observable<SolicitudRepuesto> {
    console.log(dto);
    return this.http.post<SolicitudRepuesto>(this.url, dto).pipe(
      tap(() => this.findAllOT())
    );
  }

  // === PUT: Actualizar solicitud
  updateSolicitud(id: number, dto: SolicitudRepuesto): Observable<SolicitudRepuesto> {
    return this.http.put<SolicitudRepuesto>(`${this.url}/${id}`, dto).pipe(
      tap(() => this.findAllOT())
    );
  }

  // === PATCH: Cambiar estado
  cambiarEstado(id: number, nuevoEstado: string): Observable<SolicitudRepuesto> {
    return this.http.patch<SolicitudRepuesto>(`${this.url}/${id}/estado`, { estado: nuevoEstado });
  }

  // === GET: Por estado
  findByEstado(estado: string): Observable<SolicitudRepuesto[]> {
    return this.http.get<SolicitudRepuesto[]>(`${this.url}/estado/${estado}`);
  }

  // === Auxiliares
  listarUsuarios(): Observable<any> {
    return this.http.get('/api/usuarios');
  }

  listarRepuestos(): Observable<any> {
    return this.http.get('/api/repuesto');
  }

  listarBuses(): Observable<any> {
    return this.http.get('/api/bus');
  }

  // === Comunicación y selección
  getMessages$(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string): void {
    this.messageSubject.next(message);
  }

  seleccionarSolicitud(solicitud: SolicitudRepuesto): void {
    this.solicitudSeleccionadaSubject.next(solicitud);
  }
}
