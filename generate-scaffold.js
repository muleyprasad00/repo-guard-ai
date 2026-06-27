const fs = require('fs');
const path = require('path');

const srcAppPath = path.join(__dirname, 'src', 'app');

function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function createFile(filePath, content) {
    createDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
}

const structure = {
    'core/models/interfaces.ts': `
export interface Repository {
    id: string;
    name: string;
    fullName: string;
    description: string;
    private: boolean;
    owner: RepositoryOwner;
    defaultBranch: string;
    language: string;
    updatedAt: Date;
}

export interface RepositoryOwner {
    login: string;
    id: string;
    avatarUrl: string;
}

export interface Scan {
    id: string;
    repositoryId: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
    duration: number;
    startedBy: string;
    branch: string;
    commit: string;
    startedAt: Date;
    completedAt?: Date;
}

export interface SecurityReport {
    id: string;
    scanId: string;
    score: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
}

export interface Vulnerability {
    id: string;
    packageId: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    cve: string;
    description: string;
    status: 'open' | 'fixed' | 'ignored';
}

export interface PackageDependency {
    name: string;
    currentVersion: string;
    recommendedVersion: string;
}

export interface PackageFix {
    id: string;
    vulnerabilityId: string;
    prUrl: string;
    status: 'pending' | 'merged' | 'closed';
}

export interface Workflow {
    id: string;
    name: string;
    status: string;
}

export interface WorkflowRun {
    id: string;
    workflowId: string;
    status: string;
    conclusion: string;
}

export interface AIRecommendation {
    summary: string;
    riskAnalysis: string;
    upgradeRecommendation: string;
    breakingChanges: string;
    confidenceScore: number;
}

export interface DashboardStatistics {
    securityScore: number;
    totalRepositories: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
    pendingFixes: number;
}

export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    token: string;
}
`,
    'core/models/index.ts': `export * from './interfaces';`,

    'core/services/github.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  constructor() { }
  // TODO: Implement github auth and api calls
}
`,
    'core/services/authentication.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }
  // TODO: Implement authentication
}
`,
    'core/services/repository.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor() { }
  // TODO: Implement repository fetch
}
`,
    'core/services/scan.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  constructor() { }
  // TODO: Implement scan triggers
}
`,
    'core/services/workflow.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  constructor() { }
  // TODO: Implement workflow fetch
}
`,
    'core/services/security.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor() { }
  // TODO: Implement security reports
}
`,
    'core/services/ai.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  constructor() { }
  // TODO: Implement ai review
}
`,
    'core/services/notification.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }
  // TODO: Implement snackbar notifications
}
`,
    'core/services/settings.service.ts': `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() { }
  // TODO: Implement user settings
}
`,
    'core/services/index.ts': `
export * from './github.service';
export * from './authentication.service';
export * from './repository.service';
export * from './scan.service';
export * from './workflow.service';
export * from './security.service';
export * from './ai.service';
export * from './notification.service';
export * from './settings.service';
`,

    'shared/components/header/header.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  template: \`
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleSidebar()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>RepoGuard AI</span>
      <span class="spacer"></span>
      <button mat-icon-button>
        <mat-icon>notifications</mat-icon>
      </button>
      <button mat-button [matMenuTriggerFor]="menu">
        <mat-icon>account_circle</mat-icon> Profile
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  \`,
  styles: [\`
    .spacer { flex: 1 1 auto; }
  \`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  toggleSidebar() {
    // TODO: emit event to toggle sidebar
  }
}
`,
    'shared/components/sidebar/sidebar.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  template: \`
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <div matListItemTitle>Dashboard</div>
      </a>
      <a mat-list-item routerLink="/repositories" routerLinkActive="active">
        <mat-icon matListItemIcon>folder</mat-icon>
        <div matListItemTitle>Repositories</div>
      </a>
      <a mat-list-item routerLink="/scans" routerLinkActive="active">
        <mat-icon matListItemIcon>scanner</mat-icon>
        <div matListItemTitle>Scans</div>
      </a>
      <a mat-list-item routerLink="/vulnerabilities" routerLinkActive="active">
        <mat-icon matListItemIcon>bug_report</mat-icon>
        <div matListItemTitle>Vulnerabilities</div>
      </a>
      <a mat-list-item routerLink="/ai-review" routerLinkActive="active">
        <mat-icon matListItemIcon>smart_toy</mat-icon>
        <div matListItemTitle>AI Review</div>
      </a>
      <a mat-list-item routerLink="/workflows" routerLinkActive="active">
        <mat-icon matListItemIcon>account_tree</mat-icon>
        <div matListItemTitle>Workflow History</div>
      </a>
      <a mat-list-item routerLink="/settings" routerLinkActive="active">
        <mat-icon matListItemIcon>settings</mat-icon>
        <div matListItemTitle>Settings</div>
      </a>
    </mat-nav-list>
  \`,
  styles: [\`
    .active { background: rgba(0,0,0,0.05); }
  \`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {}
`,
    'shared/components/footer/footer.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: \`
    <footer style="text-align: center; padding: 1rem; color: #666; font-size: 0.875rem;">
      &copy; 2026 RepoGuard AI. All rights reserved.
    </footer>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
`,
    'shared/components/loading/loading.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: \`
    <div style="display:flex; justify-content:center; align-items:center; height:100%; padding: 2rem;">
      <mat-spinner diameter="40"></mat-spinner>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {}
`,
    'shared/components/empty-state/empty-state.component.ts': `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  template: \`
    <div style="text-align:center; padding: 3rem; color: #888;">
      <mat-icon style="font-size: 48px; height: 48px; width: 48px;">{{icon}}</mat-icon>
      <h3>{{title}}</h3>
      <p>{{message}}</p>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  @Input() icon = 'info';
  @Input() title = 'No Data';
  @Input() message = 'Nothing to display here.';
}
`,
    'shared/components/index.ts': `
export * from './header/header.component';
export * from './sidebar/sidebar.component';
export * from './footer/footer.component';
export * from './loading/loading.component';
export * from './empty-state/empty-state.component';
`,

    'core/layout/main-layout/main-layout.component.ts': `import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent, SidebarComponent, FooterComponent } from '../../../shared/components';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, HeaderComponent, SidebarComponent, FooterComponent],
  template: \`
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header></app-header>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <app-footer></app-footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  \`,
  styles: [\`
    .sidenav-container { height: 100vh; }
    .sidenav { width: 250px; }
    .content { padding: 20px; min-height: calc(100vh - 120px); }
  \`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {}
`,

    'features/dashboard/dashboard.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  template: \`
    <h2>Dashboard</h2>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <mat-card><mat-card-header><mat-card-title>Security Score</mat-card-title></mat-card-header><mat-card-content><h2>95/100</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>Repositories</mat-card-title></mat-card-header><mat-card-content><h2>12</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>Critical Issues</mat-card-title></mat-card-header><mat-card-content><h2>0</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>High Issues</mat-card-title></mat-card-header><mat-card-content><h2>3</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>Medium Issues</mat-card-title></mat-card-header><mat-card-content><h2>14</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>Low Issues</mat-card-title></mat-card-header><mat-card-content><h2>42</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>Pending Fixes</mat-card-title></mat-card-header><mat-card-content><h2>5</h2></mat-card-content></mat-card>
      <mat-card><mat-card-header><mat-card-title>Last Scan</mat-card-title></mat-card-header><mat-card-content><p>2 hours ago</p></mat-card-content></mat-card>
    </div>
    <div style="margin-top: 24px;">
      <mat-card>
        <mat-card-header><mat-card-title>Charts Placeholder</mat-card-title></mat-card-header>
        <mat-card-content><div style="height: 200px; background: #f0f0f0; display:flex; align-items:center; justify-content:center; color:#888;">Chart graphic</div></mat-card-content>
      </mat-card>
    </div>
    <div style="margin-top: 24px;">
      <mat-card>
        <mat-card-header><mat-card-title>Recent Activity</mat-card-title></mat-card-header>
        <mat-card-content><p>User scanned repository 'core-api'...</p></mat-card-content>
      </mat-card>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
`,
    'features/repositories/repository-list/repository-list.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  template: \`
    <h2>Repositories</h2>
    <mat-form-field appearance="outline" style="width: 100%; max-width: 400px;">
      <mat-label>Search Repositories</mat-label>
      <input matInput placeholder="e.g. backend-api">
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-top: 16px;">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar style="background: #333; border-radius: 50%;"></div>
          <mat-card-title>backend-api</mat-card-title>
          <mat-card-subtitle>Main backend service</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions>
          <button mat-button color="primary">Scan</button>
          <button mat-button>Details</button>
        </mat-card-actions>
      </mat-card>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryListComponent {}
`,
    'features/scans/scan-list/scan-list.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-scan-list',
  standalone: true,
  imports: [MatTableModule],
  template: \`
    <h2>Scans</h2>
    <table mat-table [dataSource]="[{repo: 'backend-api', status: 'Completed', progress: '100%', duration: '45s', startedBy: 'admin', branch: 'main', commit: 'abc1234'}]" class="mat-elevation-z8" style="width: 100%;">
      <ng-container matColumnDef="repo">
        <th mat-header-cell *matHeaderCellDef> Repository </th>
        <td mat-cell *matCellDef="let element"> {{element.repo}} </td>
      </ng-container>
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let element"> {{element.status}} </td>
      </ng-container>
      <ng-container matColumnDef="progress">
        <th mat-header-cell *matHeaderCellDef> Progress </th>
        <td mat-cell *matCellDef="let element"> {{element.progress}} </td>
      </ng-container>
      <ng-container matColumnDef="duration">
        <th mat-header-cell *matHeaderCellDef> Duration </th>
        <td mat-cell *matCellDef="let element"> {{element.duration}} </td>
      </ng-container>
      <ng-container matColumnDef="branch">
        <th mat-header-cell *matHeaderCellDef> Branch </th>
        <td mat-cell *matCellDef="let element"> {{element.branch}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="['repo', 'status', 'progress', 'duration', 'branch']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['repo', 'status', 'progress', 'duration', 'branch'];"></tr>
    </table>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanListComponent {}
`,
    'features/vulnerabilities/vulnerability-list/vulnerability-list.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vulnerability-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: \`
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h2>Vulnerabilities</h2>
      <button mat-raised-button color="primary">Export</button>
    </div>
    <mat-card style="margin-top: 16px; padding: 24px;">
      <!-- AG Grid Placeholder -->
      <div style="height: 400px; background: #fafafa; border: 1px solid #eee; display:flex; align-items:center; justify-content:center; color: #999;">
        AG Grid Placeholder<br>
        Columns: Package, Severity, Current Version, Recommended Version, CVE, Status, Action
      </div>
    </mat-card>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VulnerabilityListComponent {}
`,
    'features/ai-review/ai-review.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ai-review',
  standalone: true,
  imports: [MatCardModule],
  template: \`
    <h2>AI Review</h2>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <mat-card>
        <mat-card-header><mat-card-title>Summary</mat-card-title></mat-card-header>
        <mat-card-content><p>AI summary of security posture...</p></mat-card-content>
      </mat-card>
      <mat-card>
        <mat-card-header><mat-card-title>Risk Analysis</mat-card-title></mat-card-header>
        <mat-card-content><p>Overall risk is Low. Dependencies are mostly up to date.</p></mat-card-content>
      </mat-card>
      <mat-card>
        <mat-card-header><mat-card-title>Upgrade Recommendation</mat-card-title></mat-card-header>
        <mat-card-content><p>Recommend upgrading 'lodash' to 4.17.21</p></mat-card-content>
      </mat-card>
      <mat-card>
        <mat-card-header><mat-card-title>Breaking Changes Check</mat-card-title></mat-card-header>
        <mat-card-content><p>No breaking changes detected for recommended upgrades.</p></mat-card-content>
      </mat-card>
    </div>
    <mat-card style="margin-top: 16px;">
      <mat-card-header><mat-card-title>AI Confidence Score</mat-card-title></mat-card-header>
      <mat-card-content><h2>98%</h2></mat-card-content>
    </mat-card>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiReviewComponent {}
`,
    'features/workflows/workflows.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-workflows',
  standalone: true,
  imports: [MatCardModule],
  template: \`
    <h2>Workflow History</h2>
    <mat-card>
      <mat-card-content>
        <p>No recent workflow runs to display.</p>
      </mat-card-content>
    </mat-card>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowsComponent {}
`,
    'features/settings/settings.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatCardModule, MatSlideToggleModule, MatButtonModule],
  template: \`
    <h2>Settings</h2>
    <mat-card style="max-width: 600px; margin-bottom: 16px;">
      <mat-card-header><mat-card-title>GitHub Connection</mat-card-title></mat-card-header>
      <mat-card-content style="padding: 16px;">
        <p>Connected as: <strong>username</strong></p>
        <button mat-stroked-button color="warn">Disconnect</button>
      </mat-card-content>
    </mat-card>
    <mat-card style="max-width: 600px; margin-bottom: 16px;">
      <mat-card-header><mat-card-title>Preferences</mat-card-title></mat-card-header>
      <mat-card-content style="padding: 16px; display:flex; flex-direction:column; gap:16px;">
        <mat-slide-toggle>Dark Mode</mat-slide-toggle>
        <mat-slide-toggle checked>Email Notifications</mat-slide-toggle>
        <mat-slide-toggle checked>Auto-scan on PR</mat-slide-toggle>
      </mat-card-content>
    </mat-card>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {}
`,
    'features/auth/login/login.component.ts': `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: \`
    <div style="display:flex; justify-content:center; align-items:center; height:100vh; background:#f0f2f5;">
      <mat-card style="width: 400px; text-align: center; padding: 2rem;">
        <mat-card-header style="justify-content:center; margin-bottom: 1rem;">
          <mat-card-title><h2>RepoGuard AI</h2></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Sign in to secure your dependencies.</p>
          <button mat-raised-button color="primary" style="width: 100%; padding: 8px;">
            <mat-icon>login</mat-icon> Login with GitHub
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {}
`,

    'app.routes.ts': `import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { 
    path: '', 
    loadComponent: () => import('./core/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'repositories', loadComponent: () => import('./features/repositories/repository-list/repository-list.component').then(m => m.RepositoryListComponent) },
      { path: 'scans', loadComponent: () => import('./features/scans/scan-list/scan-list.component').then(m => m.ScanListComponent) },
      { path: 'vulnerabilities', loadComponent: () => import('./features/vulnerabilities/vulnerability-list/vulnerability-list.component').then(m => m.VulnerabilityListComponent) },
      { path: 'ai-review', loadComponent: () => import('./features/ai-review/ai-review.component').then(m => m.AiReviewComponent) },
      { path: 'workflows', loadComponent: () => import('./features/workflows/workflows.component').then(m => m.WorkflowsComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
`,
    'app.component.ts': `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: \`<router-outlet></router-outlet>\`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repo-guard-ai';
}
`,
    'app.config.ts': `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
`
};

for (const [relativePath, content] of Object.entries(structure)) {
    createFile(path.join(srcAppPath, relativePath), content);
}

console.log('Application structure generated successfully.');
