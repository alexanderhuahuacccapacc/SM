import { Injectable } from '@angular/core';
import {GenericService} from './generic.service';
import {UnidadMedida} from '../modelo/UnidadMedida';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService extends GenericService<UnidadMedida>{

  private entidadSubject = new BehaviorSubject<UnidadMedida[]>([]);
  private messageChange: Subject<string> = new Subject<string>;

  constructor(protected override http:HttpClient) {
    super(http, `${environment.HOST}/unidadmedidas`);
  }
  setEntidadChange(data: UnidadMedida[]) { this.entidadSubject.next(data);}
  getEntidadChange() { return this.entidadSubject.asObservable();}
  setMessageChange(data: string) { this.messageChange.next(data);}
}
