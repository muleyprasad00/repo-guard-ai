const fs = require('fs');
const path = require('path');

const components = [
    {
        name: 'PageHeaderComponent',
        selector: 'app-page-header',
        dir: 'shared/components/page-header',
        fileBase: 'page-header.component',
        imports: '[]',
        tsInputs: `  @Input({ required: true }) title!: string;
  @Input() description?: string;`,
        html: `<div class="page-header">
  <h1 class="mat-headline-4">{{ title }}</h1>
  @if (description) {
    <p class="mat-body-1 text-muted">{{ description }}</p>
  }
</div>`,
        scss: `.page-header {
  margin-bottom: 24px;
  h1 { margin-bottom: 4px; }
  .text-muted { color: #666; }
}`
    },
    {
        name: 'StatCardComponent',
        selector: 'app-stat-card',
        dir: 'shared/components/stat-card',
        fileBase: 'stat-card.component',
        imports: '[MatCardModule, MatIconModule]',
        tsInputs: `  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input() icon?: string;
  @Input() color: 'primary' | 'accent' | 'warn' | 'default' = 'default';`,
        html: `<mat-card class="stat-card" [ngClass]="color">
  <mat-card-content>
    <div class="stat-header">
      <span class="stat-title">{{ title }}</span>
      @if (icon) {
        <mat-icon [color]="color !== 'default' ? color : undefined">{{ icon }}</mat-icon>
      }
    </div>
    <div class="stat-value">{{ value }}</div>
  </mat-card-content>
</mat-card>`,
        scss: `.stat-card {
  height: 100%;
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .stat-title {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }
  .stat-value {
    font-size: 32px;
    font-weight: 500;
  }
  &.primary { border-top: 4px solid #3f51b5; }
  &.accent { border-top: 4px solid #ff4081; }
  &.warn { border-top: 4px solid #f44336; }
}`
    },
    {
        name: 'LoadingComponent',
        selector: 'app-loading',
        dir: 'shared/components/loading',
        fileBase: 'loading.component',
        imports: '[MatProgressSpinnerModule]',
        tsInputs: `  @Input() diameter = 40;`,
        html: `<div class="loading-container">
  <mat-spinner [diameter]="diameter"></mat-spinner>
</div>`,
        scss: `.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
}`
    },
    {
        name: 'EmptyStateComponent',
        selector: 'app-empty-state',
        dir: 'shared/components/empty-state',
        fileBase: 'empty-state.component',
        imports: '[MatIconModule]',
        tsInputs: `  @Input() icon = 'info';
  @Input({ required: true }) title!: string;
  @Input() description?: string;`,
        html: `<div class="empty-state-container">
  <mat-icon class="empty-state-icon">{{ icon }}</mat-icon>
  <h3 class="mat-headline-6">{{ title }}</h3>
  @if (description) {
    <p class="mat-body-1">{{ description }}</p>
  }
  <ng-content></ng-content>
</div>`,
        scss: `.empty-state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
  color: #666;
  
  .empty-state-icon {
    font-size: 64px;
    height: 64px;
    width: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
}`
    },
    {
        name: 'ConfirmationDialogComponent',
        selector: 'app-confirmation-dialog',
        dir: 'shared/components/confirmation-dialog',
        fileBase: 'confirmation-dialog.component',
        imports: '[MatDialogModule, MatButtonModule]',
        tsInputs: `  // TODO: Inject MAT_DIALOG_DATA`,
        html: `<h2 mat-dialog-title>Confirm Action</h2>
<mat-dialog-content>
  <p>Are you sure you want to proceed?</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-raised-button color="primary" [mat-dialog-close]="true">Confirm</button>
</mat-dialog-actions>`,
        scss: `/* Dialog styles */`
    },
    {
        name: 'SearchBoxComponent',
        selector: 'app-search-box',
        dir: 'shared/components/search-box',
        fileBase: 'search-box.component',
        imports: '[MatFormFieldModule, MatInputModule, MatIconModule]',
        tsInputs: `  @Input() placeholder = 'Search...';`,
        html: `<mat-form-field appearance="outline" class="search-field">
  <mat-label>{{ placeholder }}</mat-label>
  <mat-icon matPrefix>search</mat-icon>
  <input matInput [placeholder]="placeholder">
</mat-form-field>`,
        scss: `.search-field {
  width: 100%;
}`
    },
    {
        name: 'SeverityChipComponent',
        selector: 'app-severity-chip',
        dir: 'shared/components/severity-chip',
        fileBase: 'severity-chip.component',
        imports: '[MatChipsModule]',
        tsInputs: `  @Input({ required: true }) severity!: 'critical' | 'high' | 'medium' | 'low' | 'unknown';`,
        html: `<mat-chip [ngClass]="'severity-' + severity" disableRipple>
  {{ severity | titlecase }}
</mat-chip>`,
        scss: `mat-chip {
  font-weight: 500;
  &.severity-critical { background-color: #d32f2f; color: white; }
  &.severity-high { background-color: #f57c00; color: white; }
  &.severity-medium { background-color: #fbc02d; color: black; }
  &.severity-low { background-color: #388e3c; color: white; }
  &.severity-unknown { background-color: #9e9e9e; color: white; }
}`
    }
];

const srcAppPath = path.join(__dirname, 'src', 'app');

for (const comp of components) {
    const compDir = path.join(srcAppPath, comp.dir);
    if (!fs.existsSync(compDir)) {
        fs.mkdirSync(compDir, { recursive: true });
    }

    let extraImportsStr = '';
    if (comp.imports.includes('MatCardModule')) extraImportsStr += "import { MatCardModule } from '@angular/material/card';\n";
    if (comp.imports.includes('MatIconModule')) extraImportsStr += "import { MatIconModule } from '@angular/material/icon';\n";
    if (comp.imports.includes('MatProgressSpinnerModule')) extraImportsStr += "import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';\n";
    if (comp.imports.includes('MatDialogModule')) extraImportsStr += "import { MatDialogModule } from '@angular/material/dialog';\n";
    if (comp.imports.includes('MatButtonModule')) extraImportsStr += "import { MatButtonModule } from '@angular/material/button';\n";
    if (comp.imports.includes('MatFormFieldModule')) extraImportsStr += "import { MatFormFieldModule } from '@angular/material/form-field';\n";
    if (comp.imports.includes('MatInputModule')) extraImportsStr += "import { MatInputModule } from '@angular/material/input';\n";
    if (comp.imports.includes('MatChipsModule')) extraImportsStr += "import { MatChipsModule } from '@angular/material/chips';\n";
    
    // add CommonModule if ngClass or TitleCase pipe is used
    if (comp.html.includes('ngClass') || comp.html.includes('titlecase')) {
        extraImportsStr += "import { CommonModule } from '@angular/common';\n";
        comp.imports = comp.imports.replace('[', '[CommonModule, ');
    }

    const tsContent = "import { Component, ChangeDetectionStrategy, Input } from '@angular/core';\n" +
extraImportsStr + "\n" +
"@Component({\n" +
"  selector: '" + comp.selector + "',\n" +
"  standalone: true,\n" +
"  imports: " + comp.imports + ",\n" +
"  templateUrl: './" + comp.fileBase + ".html',\n" +
"  styleUrl: './" + comp.fileBase + ".scss',\n" +
"  changeDetection: ChangeDetectionStrategy.OnPush\n" +
"})\n" +
"export class " + comp.name + " {\n" +
comp.tsInputs + "\n" +
"  // TODO: Add any required component logic\n" +
"}\n";
    fs.writeFileSync(path.join(compDir, comp.fileBase + '.ts'), tsContent, 'utf8');
    fs.writeFileSync(path.join(compDir, comp.fileBase + '.html'), comp.html, 'utf8');
    fs.writeFileSync(path.join(compDir, comp.fileBase + '.scss'), comp.scss, 'utf8');
}

// Generate shared index.ts
const indexContent = components.map(c => "export * from './" + c.dir.replace('shared/components/', '') + "/" + c.fileBase + "';").join('\\n');
fs.writeFileSync(path.join(srcAppPath, 'shared', 'components', 'index.ts'), indexContent, 'utf8');

console.log('Shared components generated.');
