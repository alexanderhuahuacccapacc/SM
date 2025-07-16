import { Injectable } from '@angular/core';
import {GenericService} from './generic.service';
import {UnidadMedida} from '../modelo/UnidadMedida';
import {Marca} from '../modelo/Marca';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends GenericService<Marca>{

  private entidadSubject = new BehaviorSubject<Marca[]>([]);
  private messageChange: Subject<string> = new Subject<string>;

  constructor(protected override http:HttpClient) {
    super(http, `${environment.HOST}/marcas`);
  }

  setEntidadChange(data: Marca[]) { this.entidadSubject.next(data);}
  getEntidadChange() { return this.entidadSubject.asObservable();}

  setMessageChange(data: string) { this.messageChange.next(data);}
  getMessageChange() { return this.messageChange.asObservable();}

}
