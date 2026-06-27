import { Observable } from 'rxjs';
import { AuthUser } from './auth-user.interface';
import { InjectionToken } from '@angular/core';

export interface AuthProvider {
  connect(token: string): Observable<boolean>;
  disconnect(): void;
  isAuthenticated(): boolean;
  getAccessToken(): string | null;
  getCurrentUser(): AuthUser | null;
  validate(): Observable<boolean>;
}

export const AUTH_PROVIDER = new InjectionToken<AuthProvider>('AUTH_PROVIDER');
