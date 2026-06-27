import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-workflows',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './workflows.component.html',
  styleUrl: './workflows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowsComponent {
  // TODO: Add component logic
}
