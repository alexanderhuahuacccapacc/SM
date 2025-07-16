import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Solicitud } from '../modelo/Solicitud';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService extends GenericService<Solicitud> {

  private entidadSubject = new BehaviorSubject<Solicitud[]>([]);
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/solicitudcompra`);
  }

  listar(): Observable<Solicitud[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(data => data.map(item => ({
        id_solicitud_compra: item.idSolicitudCompra,           // Mapea "id" del backend a "id_solicitud_compra"
        sc_cantidad: item.cantidad,             // Mapea "cantidad" a "sc_cantidad"
        sc_estado: item.estado,                 // Mapea "estado" a "sc_estado"
        id_proveedor: item.idProveedor,         // Mapea "proveedorId" a "id_proveedor"
        id_repuesto: item.idRepuesto            // Mapea "repuestoId" a "id_repuesto"
      })))
    );
  }

  override delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  getEntidadChange() {
    return this.entidadSubject.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

}
