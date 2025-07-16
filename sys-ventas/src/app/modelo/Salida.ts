export class Salida {
  constructor(
    public id: number,
    public idRepuesto: number | null = null,
    public cantidadEntregada: number = 0,
    public destinatario: string,
    public codigo: string ,
    public fechaSalida: Date = new Date(),
    public estado: string = '',
    public nombreRepuesto?: string
  ) {
  }

}
