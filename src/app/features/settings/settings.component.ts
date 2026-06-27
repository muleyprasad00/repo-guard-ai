import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);

  hidePassword = signal(true);
  isConnecting = signal(false);

  patForm = this.fb.group({
    token: [this.authService.token() || '', Validators.required]
  });

  togglePasswordVisibility(): void {
    this.hidePassword.update(v => !v);
  }

  connect(): void {
    if (this.patForm.invalid) return;
    
    this.isConnecting.set(true);
    const token = this.patForm.value.token!;
    
    this.authService.login(token).subscribe({
      next: (success) => {
        this.isConnecting.set(false);
        if (!success) {
          this.patForm.setErrors({ invalidToken: true });
        }
      },
      error: () => {
        this.isConnecting.set(false);
        this.patForm.setErrors({ invalidToken: true });
      }
    });
  }

  disconnect(): void {
    this.authService.logout();
    this.patForm.reset();
  }

  validate(): void {
    this.isConnecting.set(true);
    this.authService.validate().subscribe({
      next: (success) => {
        this.isConnecting.set(false);
        if (!success) {
          this.patForm.setErrors({ invalidToken: true });
        }
      }
    });
  }
}
