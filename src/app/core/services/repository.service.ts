import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { GitHubRepository } from '../models/github.interfaces';
import { GitHubApiService } from './github-api.service';

export type RepositorySort = 'updated' | 'name' | 'stars' | 'language';
export type SortDirection = 'asc' | 'desc';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private readonly githubApi = inject(GitHubApiService);

  private readonly repositoriesSignal = signal<GitHubRepository[]>([]);
  private readonly selectedRepositorySignal = signal<GitHubRepository | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly searchTextSignal = signal('');
  private readonly sortBySignal = signal<RepositorySort>('updated');
  private readonly sortDirectionSignal = signal<SortDirection>('desc');
  private readonly errorSignal = signal<string | null>(null);

  readonly repositories = this.repositoriesSignal.asReadonly();
  readonly selectedRepository = this.selectedRepositorySignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly searchText = this.searchTextSignal.asReadonly();
  readonly sortBy = this.sortBySignal.asReadonly();
  readonly sortDirection = this.sortDirectionSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly filteredRepositories = computed(() => {
    const searchText = this.searchTextSignal().trim().toLowerCase();
    const repositories = searchText
      ? this.repositoriesSignal().filter((repository) => this.matchesSearch(repository, searchText))
      : [...this.repositoriesSignal()];

    return repositories.sort((first, second) => this.compareRepositories(first, second));
  });

  loadRepositories(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.githubApi
      .getRepositories()
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (repositories) => this.repositoriesSignal.set(repositories),
        error: () => {
          this.repositoriesSignal.set([]);
          this.selectedRepositorySignal.set(null);
          this.errorSignal.set('Unable to load repositories from GitHub.');
        }
      });
  }

  selectRepository(repository: GitHubRepository | null): void {
    this.selectedRepositorySignal.set(repository);
  }

  setSearchText(searchText: string): void {
    this.searchTextSignal.set(searchText);
  }

  setSort(sortBy: RepositorySort, direction: SortDirection = this.sortDirectionSignal()): void {
    this.sortBySignal.set(sortBy);
    this.sortDirectionSignal.set(direction);
  }

  refreshSelectedRepository(): void {
    const selectedRepository = this.selectedRepositorySignal();

    if (!selectedRepository) {
      return;
    }

    this.githubApi
      .getRepository(selectedRepository.owner.login, selectedRepository.name)
      .subscribe((repository) => this.selectedRepositorySignal.set(repository));
  }

  private matchesSearch(repository: GitHubRepository, searchText: string): boolean {
    return [
      repository.name,
      repository.fullName,
      repository.description ?? '',
      repository.language ?? '',
      repository.owner.login
    ].some((value) => value.toLowerCase().includes(searchText));
  }

  private compareRepositories(first: GitHubRepository, second: GitHubRepository): number {
    const direction = this.sortDirectionSignal() === 'asc' ? 1 : -1;

    switch (this.sortBySignal()) {
      case 'name':
        return first.name.localeCompare(second.name) * direction;
      case 'stars':
        return (first.stargazersCount - second.stargazersCount) * direction;
      case 'language':
        return (first.language ?? '').localeCompare(second.language ?? '') * direction;
      case 'updated':
        return (
          (new Date(first.updatedAt).getTime() - new Date(second.updatedAt).getTime()) * direction
        );
    }
  }
}
