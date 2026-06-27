import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryListComponent {
  // TODO: Add component logic
}
