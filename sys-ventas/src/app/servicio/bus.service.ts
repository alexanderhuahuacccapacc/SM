import {GenericService} from './generic.service';
import {Bus} from '../modelo/Bus';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable, Inject} from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BusService extends GenericService<Bus>{
  private busesSubject = new BehaviorSubject<Bus[]>([]);
  private messageSubject = new BehaviorSubject<string>('');

  constructor(
    protected override http: HttpClient,  // <-- Añadido override
    @Inject('url') protected override url: string  // <-- Añadido override
  ) {
    super(http, `${url}/buses`);
  }

  // Observable de la lista de buses
  getBuses$(): Observable<Bus[]> {
    return this.busesSubject.asObservable();
  }

  // Actualizar lista de buses
  updateBusesList(buses: Bus[]): void {
    this.busesSubject.next(buses);
  }

  // Mensajes del servicio
  getMessages$(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string): void {
    this.messageSubject.next(message);
  }

  // Métodos específicos para buses
  buscarPorPlaca(placa: string): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.url}/buscar?placa=${placa}`);
  }

  cambiarEstado(id: number, estado: string): Observable<Bus> {
    return this.http.patch<Bus>(`${this.url}/${id}/estado`, { estado });
  }

  getBusesDisponibles(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.url}/disponibles`);
  }

  // Sobreescribir findAll para actualizar el subject
  override findAll(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.url).pipe(
      tap(buses => this.updateBusesList(buses))
    );
  }
}
