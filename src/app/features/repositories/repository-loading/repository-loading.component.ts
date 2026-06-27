import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-repository-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './repository-loading.component.html',
  styleUrl: './repository-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryLoadingComponent {}

