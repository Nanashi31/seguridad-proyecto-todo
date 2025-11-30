import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiService } from './api.service';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'segcdmx_token';

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  login(username: string, password: string): Observable<boolean> {
    if (!username.trim() || password.trim().length < 4) {
      return of(false);
    }

    return this.api.post<LoginResponse>('auth/login', { username, password }).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        // Re-lanzar el error para que el componente pueda manejarlo
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }
}
