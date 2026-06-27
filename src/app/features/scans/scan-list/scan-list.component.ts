import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-scan-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './scan-list.component.html',
  styleUrl: './scan-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanListComponent {
  // TODO: Add component logic
}
