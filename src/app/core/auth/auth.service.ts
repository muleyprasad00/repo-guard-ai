import { Injectable, Inject } from '@angular/core';
import { AUTH_PROVIDER, AuthProvider } from './auth-provider.interface';
import { Observable } from 'rxjs';
import { AuthUser } from './auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(AUTH_PROVIDER) private authProvider: AuthProvider) {}

  login(token: string): Observable<boolean> {
    return this.authProvider.connect(token);
  }

  logout(): void {
    this.authProvider.disconnect();
  }

  currentUser(): AuthUser | null {
    return this.authProvider.getCurrentUser();
  }

  token(): string | null {
    return this.authProvider.getAccessToken();
  }

  validate(): Observable<boolean> {
    return this.authProvider.validate();
  }

  isAuthenticated(): boolean {
    return this.authProvider.isAuthenticated();
  }
}
