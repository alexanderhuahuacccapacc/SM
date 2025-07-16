import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatListItem, MatNavList} from '@angular/material/list';
import {NgClass} from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Solicitud} from '../../modelo/Solicitud';
import {SolicitudService} from '../../servicio/Solicitud.service';

@Component({
  selector: 'app-gestionar-visualizar',
  standalone: true,
  imports: [
    MaterialModule,
    MatNavList,
    NgClass,
    RouterLink,
    RouterOutlet,
    MatListItem,
  ],
  templateUrl: './gestionar-visualizar.component.html',
  styleUrls: ['./gestionar-visualizar.component.css'],
})
export class GestionarVisualizarComponent {
  requestData: Solicitud[]= [];
  displayedColumns: string[] = [
    'id_solicitud_compra',
    'sc_cantidad',
    'sc_estado',
    'id_proveedor',
    'id_repuesto',
    'actions'
  ];
  constructor(private solicitudService: SolicitudService) {} // Inyecta el servicio
  row: any | string;

  ngOnInit(): void {
    this.loadSolicitudes(); // Llama al método para cargar los datos al inicializar el componente
  }

  loadSolicitudes(): void {
    this.solicitudService.listar().subscribe({
      next: (data) => {
        this.requestData = data; // Asigna los datos obtenidos a requestData
      },
      error: (error) => {
        console.error('Error al cargar las solicitudes:', error);
      }
    });
  }
  getPriorityClass(priority: string): string {
    return {
      'Alta': 'priority-high',
      'Media': 'priority-medium',
      'Baja': 'priority-low',
    }[priority] || '';
  }

  getStatusClass(color: string): string {
    return {
      'yellow': 'status-pending',
      'green': 'status-approved',
      'red': 'status-denied',
    }[color] || '';
  }
  generatePDF(element: Solicitud) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Solicitud de Compra N°: #${element.id_solicitud_compra}`, 10, 20);

    doc.setFontSize(12);
    doc.text(`Cantidad solicitada: ${element.sc_cantidad}`, 10, 30);
    doc.text(`Estado: ${element.sc_estado}`, 10, 40);
    doc.text(`Proveedor: ${element.id_proveedor || element.id_proveedor}`, 10, 50);
    doc.text(`Repuesto: ${element.id_repuesto || element.id_repuesto}`, 10, 60);

    doc.save(`solicitud_compra_${element.id_solicitud_compra}.pdf`);
  }

}
