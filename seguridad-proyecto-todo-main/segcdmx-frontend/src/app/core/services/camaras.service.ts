import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Camara } from '../models/camara.model';
import { ApiService } from './api.service';

// Backend API model from /equipos-catalogo
interface EquipoCatalogoApi {
  id_equipo: number;
  nombre_equipo: string;
  modelo: string;
}

@Injectable({
  providedIn: 'root',
})
export class CamarasService {
  constructor(private api: ApiService) {}

  // Mapping function to convert backend model to frontend UI model
  private mapFromApi(api: EquipoCatalogoApi, index: number): Camara {
    // The backend model is very generic. We'll create placeholder data
    // for the UI fields that are missing, as instructed.
    return {
      id: `C-${api.id_equipo}`,
      nombre: api.nombre_equipo,
      // Placeholder data for fields not present in EquipoCatalogo
      ubicacion: ['Acceso Principal', 'Lobby', 'Perímetro', 'Estacionamiento'][index % 4],
      urlImagen: `https://picsum.photos/seed/segcdmx-${api.id_equipo}/400/300`,
      tieneAlerta: index % 5 === 0, // Mocked alert status
      estado: index % 7 === 0 ? 'Sin señal' : 'Operativa', // Mocked operational status
    };
  }

  getAll(): Observable<Camara[]> {
    return this.api.get<EquipoCatalogoApi[]>('equipos-catalogo').pipe(
      map(apiEquipos => apiEquipos.map((equipo, index) => this.mapFromApi(equipo, index)))
    );
  }

  // getById is not currently used by the component, so it is omitted for now.
}