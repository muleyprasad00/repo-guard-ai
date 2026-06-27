
export interface Repository {
    id: string;
    name: string;
    fullName: string;
    description: string;
    private: boolean;
    owner: RepositoryOwner;
    defaultBranch: string;
    language: string;
    updatedAt: Date;
}

export interface RepositoryOwner {
    login: string;
    id: string;
    avatarUrl: string;
}

export interface Scan {
    id: string;
    repositoryId: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
    duration: number;
    startedBy: string;
    branch: string;
    commit: string;
    startedAt: Date;
    completedAt?: Date;
}

export interface SecurityReport {
    id: string;
    scanId: string;
    score: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
}

export interface Vulnerability {
    id: string;
    packageId: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    cve: string;
    description: string;
    status: 'open' | 'fixed' | 'ignored';
}

export interface PackageDependency {
    name: string;
    currentVersion: string;
    recommendedVersion: string;
}

export interface PackageFix {
    id: string;
    vulnerabilityId: string;
    prUrl: string;
    status: 'pending' | 'merged' | 'closed';
}

export interface Workflow {
    id: string;
    name: string;
    status: string;
}

export interface WorkflowRun {
    id: string;
    workflowId: string;
    status: string;
    conclusion: string;
}

export interface AIRecommendation {
    summary: string;
    riskAnalysis: string;
    upgradeRecommendation: string;
    breakingChanges: string;
    confidenceScore: number;
}

export interface DashboardStatistics {
    securityScore: number;
    totalRepositories: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
    pendingFixes: number;
}

export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    token: string;
}
