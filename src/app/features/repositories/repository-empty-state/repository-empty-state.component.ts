import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repository-empty-state',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './repository-empty-state.component.html',
  styleUrl: './repository-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryEmptyStateComponent {
  readonly hasSearch = input(false);
  readonly refresh = output<void>();
}

