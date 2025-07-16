export interface Solicitud {
  id_solicitud_compra: number;  // Asegúrate de que coincida con el nombre de la propiedad en el JSON del backend.
  sc_cantidad: number;
  sc_estado: string;
  id_proveedor: number;
  id_repuesto: number;
}
