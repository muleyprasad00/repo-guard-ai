import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import {
  GitHubBranch,
  GitHubRepository,
  GitHubWorkflow
} from '../../../core/models/github.interfaces';
import { GitHubApiService } from '../../../core/services/github-api.service';

export interface RepositoryDetailsDialogData {
  repository: GitHubRepository;
}

@Component({
  selector: 'app-repository-details-dialog',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  templateUrl: './repository-details-dialog.component.html',
  styleUrl: './repository-details-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryDetailsDialogComponent implements OnInit {
  private readonly githubApi = inject(GitHubApiService);
  private readonly data = inject<RepositoryDetailsDialogData>(MAT_DIALOG_DATA);

  readonly repository = this.data.repository;
  readonly branches = signal<GitHubBranch[]>([]);
  readonly workflows = signal<GitHubWorkflow[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    forkJoin({
      branches: this.githubApi.getBranches(this.repository.owner.login, this.repository.name),
      workflows: this.githubApi.getWorkflows(this.repository.owner.login, this.repository.name)
    }).subscribe({
      next: ({ branches, workflows }) => {
        this.branches.set(branches);
        this.workflows.set(workflows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Repository details could not be loaded.');
        this.loading.set(false);
      }
    });
  }
}
