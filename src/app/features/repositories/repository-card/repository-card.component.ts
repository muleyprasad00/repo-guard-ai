import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GitHubRepository } from '../../../core/models/github.interfaces';

@Component({
  selector: 'app-repository-card',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryCardComponent {
  readonly repository = input.required<GitHubRepository>();
  readonly selected = input(false);

  readonly selectedChange = output<GitHubRepository>();
  readonly details = output<GitHubRepository>();
  readonly scan = output<GitHubRepository>();
}

