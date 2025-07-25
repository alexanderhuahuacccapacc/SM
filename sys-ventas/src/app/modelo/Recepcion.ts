export class Recepcion {
  constructor(
    public id: number | null = null,
    public idRepuesto: number | null = null,
    public repuesto: string ,
    public cantidadRecibida: number = 0,
    public proveedor: string = '',
    public codigo: string = '',
    public fechaRecepcion: Date = new Date(),
    public estado: 'PENDIENTE' | 'RECIBIDO' | 'VALIDADA' = 'PENDIENTE' // Solo estos valores
  ) {}
}
