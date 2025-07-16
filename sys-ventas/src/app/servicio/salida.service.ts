import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Salida } from '../modelo/Salida';
import { Observable, Subject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SalidaService extends GenericService<Salida> {
  private entidadCambio = new Subject<Salida[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/salidas`);
  }

  // Métodos para notificar cambios
  getEntidadChange(): Observable<Salida[]> {
    return this.entidadCambio.asObservable();
  }

  setEntidadChange(lista: Salida[]): void {
    this.entidadCambio.next(lista);
  }

  getMessageChange(): Observable<string> {
    return this.mensajeCambio.asObservable();
  }

  setMessageChange(mensaje: string): void {
    this.mensajeCambio.next(mensaje);
  }

  // Métodos CRUD
  findAllf(): Observable<Salida[]> {
    return this.listar();
  }

  listar(): Observable<Salida[]> {
    return this.http.get<Salida[]>(this.url).pipe(
      map(salidas => salidas.map(salida => ({
        ...salida,
        fechaSalida: new Date(salida.fechaSalida)
      })))
    );
  }

  findByIdf(id: number): Observable<Salida> {
    return this.buscarid(id);
  }

  buscarid(id: number): Observable<Salida> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(data => ({
        id: data.id,
        idRepuesto: data.repuesto?.id || null,
        cantidadEntregada: data.cantidadEntregada,
        destinatario: data.destinatario,
        codigo: data.codigo,
        fechaSalida: new Date(data.fechaSalida),
        estado: data.estado,
        nombreRepuesto: data.repuesto?.nombre || ''
      }))
    );
  }



  guardar(salida: Omit<Salida, 'id'>): Observable<Salida> {
    const salidaToSave = {
      ...salida,
      fechaSalida: salida.fechaSalida instanceof Date ?
        salida.fechaSalida.toISOString().split('T')[0] :
        salida.fechaSalida
    };
    return this.http.post<Salida>(this.url, salidaToSave).pipe(
      map(response => ({
        ...response,
        fechaSalida: new Date(response.fechaSalida)
      }))
    );
  }

  updatef(id: number, salida: Salida): Observable<void> {
    return this.actualizaer(id, salida);
  }

  actualizaer(id: number, salida: Salida): Observable<void> {
    const salidaToUpdate = {
      ...salida,
      fechaSalida: salida.fechaSalida instanceof Date ?
        salida.fechaSalida.toISOString().split('T')[0] :
        salida.fechaSalida
    };
    return this.http.put<void>(`${this.url}/${id}`, salidaToUpdate);
  }


  deleteWithStockUpdate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}/with-stock-update`);
  }
  // En SalidaService
  setEntidadCambio(lista: Salida[]): void {
    this.entidadCambio.next(lista);
  }

  setMensajeCambio(mensaje: string): void {
    this.mensajeCambio.next(mensaje);
  }
  registrarSalida(idRepuesto: number, cantidad: number, destinatario:string): Observable<any> {
    return this.http.post(`${this.url}/registrar`, {
      idRepuesto,
      cantidad,
      destinatario
    });
  }
  actualizarSalidaConStock(id: number, salida: any, diferenciaStock: number): Observable<any> {
    return this.http.put(`${this.url}/actualizar-con-stock/${id}`, salida, {
      params: { diferenciaStock: diferenciaStock.toString() }
    });
  }
}
