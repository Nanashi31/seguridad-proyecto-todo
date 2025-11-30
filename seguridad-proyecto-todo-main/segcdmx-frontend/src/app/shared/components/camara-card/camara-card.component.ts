import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Camara } from '../../../core/models/camara.model';

@Component({
  selector: 'app-camara-card',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './camara-card.component.html',
  styleUrl: './camara-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CamaraCardComponent {
  @Input({ required: true }) camara!: Camara;
}
