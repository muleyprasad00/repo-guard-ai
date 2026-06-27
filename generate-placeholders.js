const fs = require('fs');
const path = require('path');

const components = [
    { name: 'DashboardComponent', selector: 'app-dashboard', dir: 'features/dashboard', fileBase: 'dashboard.component', title: 'Dashboard', desc: 'Overview of repository security status and recent scans.' },
    { name: 'RepositoryListComponent', selector: 'app-repository-list', dir: 'features/repositories/repository-list', fileBase: 'repository-list.component', title: 'Repositories', desc: 'List of all connected GitHub repositories.' },
    { name: 'ScanListComponent', selector: 'app-scan-list', dir: 'features/scans/scan-list', fileBase: 'scan-list.component', title: 'Scans', desc: 'History and status of all vulnerability scans.' },
    { name: 'VulnerabilityListComponent', selector: 'app-vulnerability-list', dir: 'features/vulnerabilities/vulnerability-list', fileBase: 'vulnerability-list.component', title: 'Vulnerabilities', desc: 'Detailed list of all identified package vulnerabilities.' },
    { name: 'AiReviewComponent', selector: 'app-ai-review', dir: 'features/ai-review', fileBase: 'ai-review.component', title: 'AI Review', desc: 'AI-generated security recommendations and insights.' },
    { name: 'WorkflowsComponent', selector: 'app-workflows', dir: 'features/workflows', fileBase: 'workflows.component', title: 'Workflow History', desc: 'History of automated fix pull requests and workflows.' },
    { name: 'SettingsComponent', selector: 'app-settings', dir: 'features/settings', fileBase: 'settings.component', title: 'Settings', desc: 'Application configuration and user preferences.' }
];

const srcAppPath = path.join(__dirname, 'src', 'app');

for (const comp of components) {
    const compDir = path.join(srcAppPath, comp.dir);
    if (!fs.existsSync(compDir)) {
        fs.mkdirSync(compDir, { recursive: true });
    }

    const tsContent = "import { Component, ChangeDetectionStrategy } from '@angular/core';\n" +
"import { MatCardModule } from '@angular/material/card';\n\n" +
"@Component({\n" +
"  selector: '" + comp.selector + "',\n" +
"  standalone: true,\n" +
"  imports: [MatCardModule],\n" +
"  templateUrl: './" + comp.fileBase + ".html',\n" +
"  styleUrl: './" + comp.fileBase + ".scss',\n" +
"  changeDetection: ChangeDetectionStrategy.OnPush\n" +
"})\n" +
"export class " + comp.name + " {\n" +
"  // TODO: Add component logic\n" +
"}\n";
    fs.writeFileSync(path.join(compDir, comp.fileBase + '.ts'), tsContent, 'utf8');

    const htmlContent = "<mat-card class=\"page-container\">\n" +
"  <mat-card-header>\n" +
"    <mat-card-title>" + comp.title + "</mat-card-title>\n" +
"    <mat-card-subtitle>" + comp.desc + "</mat-card-subtitle>\n" +
"  </mat-card-header>\n" +
"  <mat-card-content>\n" +
"    <!-- TODO: Implement " + comp.title + " UI -->\n" +
"    <p>Placeholder content for " + comp.title + ".</p>\n" +
"  </mat-card-content>\n" +
"</mat-card>\n";
    fs.writeFileSync(path.join(compDir, comp.fileBase + '.html'), htmlContent, 'utf8');

    const scssContent = ".page-container {\n" +
"  margin: 16px;\n" +
"  padding: 16px;\n" +
"}\n";
    fs.writeFileSync(path.join(compDir, comp.fileBase + '.scss'), scssContent, 'utf8');
}

console.log('Placeholder pages generated.');
