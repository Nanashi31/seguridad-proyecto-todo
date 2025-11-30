import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { CamarasService } from '../../../core/services/camaras.service';
import { CamaraCardComponent } from '../../../shared/components/camara-card/camara-card.component';

@Component({
  selector: 'app-camaras',
  standalone: true,
  imports: [NgFor, CamaraCardComponent, AsyncPipe, NgClass, NgIf],
  templateUrl: './camaras.component.html',
  styleUrl: './camaras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CamarasComponent {
  readonly camaras$ = this.camarasService.getAll();
  readonly hasCamaras$ = this.camaras$.pipe(map(camaras => camaras.length > 0));
  gridSize: 2 | 3 | 4 = 3;
  
  // Placeholders para cuando no hay cámaras
  readonly placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

  constructor(private camarasService: CamarasService) {}

  setGrid(size: 2 | 3 | 4): void {
    this.gridSize = size;
  }
}
