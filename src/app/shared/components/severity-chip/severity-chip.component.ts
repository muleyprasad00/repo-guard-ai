import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-severity-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './severity-chip.component.html',
  styleUrl: './severity-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeverityChipComponent {
  @Input({ required: true }) severity!: 'critical' | 'high' | 'medium' | 'low' | 'unknown';
  // TODO: Add any required component logic
}
