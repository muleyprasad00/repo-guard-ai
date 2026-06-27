import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ai-review',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ai-review.component.html',
  styleUrl: './ai-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiReviewComponent {
  // TODO: Add component logic
}
