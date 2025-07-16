import { Categoria }   from './Categoria';
import { Marca }       from './Marca';
import { UnidadMedida } from './UnidadMedida';

export class Repuesto {
  constructor(
    public idRepuesto:   number,
    public nombre:       string,
    public stockActual:  number,
    public codigo:       string,
    public ubicacion:    string,
    public estado:       string,
    public stockMinimo:  number,
    public categoria:    number,
    public marca:        number,
    public unidadMedida: number
  ) {}
}
export class RepuestoReport {
  constructor(
    public idRepuesto:   number,
    public nombre:       string,
    public stockActual:  number,
    public codigo:       string,
    public ubicacion:    string,
    public estado:       string,
    public stockMinimo:  number,
    public categoria:    Categoria,
    public marca:        Marca,
    public unidadMedida: UnidadMedida
  ) {}
}
