import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { EstadoTurnosComponent } from '../components/estado-turnos/estado-turnos.component';
import { CardComponent } from '../../../shared/components/card/card.component';

interface Alerta {
  id: number;
  camara: string;
  mensaje: string;
  hora: string;
  tipo: 'alerta' | 'advertencia';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EstadoTurnosComponent, CardComponent, NgFor, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  alertas: Alerta[] = [
    { id: 1, camara: 'Cámara Norte', mensaje: 'Movimiento detectado', hora: '10:42 AM', tipo: 'alerta' },
    { id: 2, camara: 'Cámara Sur', mensaje: 'Actividad sospechosa', hora: '11:03 AM', tipo: 'alerta' },
    { id: 3, camara: 'Cámara Este', mensaje: 'Persona no autorizada', hora: '11:15 AM', tipo: 'advertencia' },
  ];

  constructor() {}
}