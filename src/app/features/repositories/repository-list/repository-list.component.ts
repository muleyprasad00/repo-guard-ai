import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GitHubRepository } from '../../../core/models/github.interfaces';
import {
  RepositoryService,
  RepositorySort,
  SortDirection
} from '../../../core/services/repository.service';
import { RepositoryCardComponent } from '../repository-card/repository-card.component';
import {
  RepositoryDetailsDialogComponent,
  RepositoryDetailsDialogData
} from '../repository-details-dialog/repository-details-dialog.component';
import { RepositoryEmptyStateComponent } from '../repository-empty-state/repository-empty-state.component';
import { RepositoryLoadingComponent } from '../repository-loading/repository-loading.component';
import { RepositorySearchComponent } from '../repository-search/repository-search.component';

@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    RepositoryCardComponent,
    RepositoryEmptyStateComponent,
    RepositoryLoadingComponent,
    RepositorySearchComponent
  ],
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryListComponent implements OnInit {
  readonly repositoryService = inject(RepositoryService);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    if (!this.repositoryService.repositories().length) {
      this.repositoryService.loadRepositories();
    }
  }

  setSearchText(searchText: string): void {
    this.repositoryService.setSearchText(searchText);
  }

  setSortBy(sortBy: RepositorySort): void {
    this.repositoryService.setSort(sortBy);
  }

  setSortDirection(sortDirection: SortDirection): void {
    this.repositoryService.setSort(this.repositoryService.sortBy(), sortDirection);
  }

  selectRepository(repository: GitHubRepository): void {
    this.repositoryService.selectRepository(repository);
  }

  openDetails(repository: GitHubRepository): void {
    this.repositoryService.selectRepository(repository);
    this.dialog.open<RepositoryDetailsDialogComponent, RepositoryDetailsDialogData>(
      RepositoryDetailsDialogComponent,
      {
        data: { repository },
        width: '720px',
        maxWidth: '94vw'
      }
    );
  }

  scanRepository(repository: GitHubRepository): void {
    this.repositoryService.selectRepository(repository);
  }
}
