import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    title: 'Login - RepoGuard AI',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: '', 
    loadComponent: () => import('./core/layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      { 
        path: 'dashboard', 
        title: 'Dashboard - RepoGuard AI',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'repositories', 
        title: 'Repositories - RepoGuard AI',
        canActivate: [authGuard],
        loadComponent: () => import('./features/repositories/repository-list/repository-list.component').then(m => m.RepositoryListComponent) 
      },
      { 
        path: 'scans', 
        title: 'Scans - RepoGuard AI',
        canActivate: [authGuard],
        loadComponent: () => import('./features/scans/scan-list/scan-list.component').then(m => m.ScanListComponent) 
      },
      { 
        path: 'vulnerabilities', 
        title: 'Vulnerabilities - RepoGuard AI',
        canActivate: [authGuard],
        loadComponent: () => import('./features/vulnerabilities/vulnerability-list/vulnerability-list.component').then(m => m.VulnerabilityListComponent) 
      },
      { 
        path: 'ai-review', 
        title: 'AI Review - RepoGuard AI',
        canActivate: [authGuard],
        loadComponent: () => import('./features/ai-review/ai-review.component').then(m => m.AiReviewComponent) 
      },
      { 
        path: 'workflows', 
        title: 'Workflows - RepoGuard AI',
        canActivate: [authGuard],
        loadComponent: () => import('./features/workflows/workflows.component').then(m => m.WorkflowsComponent) 
      },
      { 
        path: 'settings', 
        title: 'Settings - RepoGuard AI',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) 
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];
