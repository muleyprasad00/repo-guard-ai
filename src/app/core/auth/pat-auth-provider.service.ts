import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthProvider } from './auth-provider.interface';
import { AuthUser } from './auth-user.interface';

interface GitHubUserResponse {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  email: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PatAuthProvider implements AuthProvider {
  private readonly tokenKey = 'rg_github_pat';
  private readonly userKey = 'rg_github_user';
  
  private currentUserSignal = signal<AuthUser | null>(this.getStoredUser());
  private tokenSignal = signal<string | null>(this.getStoredToken());

  constructor(private http: HttpClient) {
    if (this.tokenSignal()) {
      this.validate().subscribe();
    }
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getStoredUser(): AuthUser | null {
    const storedUser = localStorage.getItem(this.userKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  private setStoredToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    this.tokenSignal.set(token);
  }

  private setStoredUser(user: AuthUser | null): void {
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.userKey);
    }

    this.currentUserSignal.set(user);
  }

  connect(token: string): Observable<boolean> {
    return this.fetchCurrentUser(token).pipe(
      tap((authUser) => {
        this.setStoredToken(token);
        this.setStoredUser(authUser);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  disconnect(): void {
    this.setStoredToken(null);
    this.setStoredUser(null);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }

  getAccessToken(): string | null {
    return this.tokenSignal();
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSignal();
  }

  validate(): Observable<boolean> {
    const token = this.tokenSignal();
    if (!token) return of(false);

    return this.fetchCurrentUser(token).pipe(
      tap((authUser) => this.setStoredUser(authUser)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  private fetchCurrentUser(token: string): Observable<AuthUser> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<GitHubUserResponse>('https://api.github.com/user', { headers }).pipe(
      map((user) => {
        return {
          login: user.login,
          id: user.id,
          avatarUrl: user.avatar_url,
          name: user.name,
          email: user.email
        };
      })
    );
  }
}
