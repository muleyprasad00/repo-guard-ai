export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { label: 'Repositories', icon: 'folder', route: '/repositories' },
  { label: 'Scans', icon: 'scanner', route: '/scans' },
  { label: 'Vulnerabilities', icon: 'bug_report', route: '/vulnerabilities' },
  { label: 'AI Review', icon: 'smart_toy', route: '/ai-review' },
  { label: 'Workflow History', icon: 'account_tree', route: '/workflows' },
  { label: 'Settings', icon: 'settings', route: '/settings' }
];
