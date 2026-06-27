import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { RepositorySort, SortDirection } from '../../../core/services/repository.service';

@Component({
  selector: 'app-repository-search',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './repository-search.component.html',
  styleUrl: './repository-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositorySearchComponent {
  readonly searchText = input('');
  readonly sortBy = input<RepositorySort>('updated');
  readonly sortDirection = input<SortDirection>('desc');

  readonly searchTextChange = output<string>();
  readonly sortByChange = output<RepositorySort>();
  readonly sortDirectionChange = output<SortDirection>();
  readonly refresh = output<void>();

  onSortByChange(event: MatSelectChange): void {
    this.sortByChange.emit(event.value as RepositorySort);
  }

  onSortDirectionChange(event: MatSelectChange): void {
    this.sortDirectionChange.emit(event.value as SortDirection);
  }
}

