import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  GitHubBranch,
  GitHubOwner,
  GitHubRepository,
  GitHubUser,
  GitHubWorkflow
} from '../models/github.interfaces';

interface GitHubOwnerResponse {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface GitHubRepositoryResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  owner: GitHubOwnerResponse;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string | null;
}

interface GitHubBranchResponse {
  name: string;
  protected: boolean;
  commit: {
    sha: string;
    url: string;
  };
}

interface GitHubWorkflowResponse {
  id: number;
  name: string;
  path: string;
  state: string;
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
  badge_url: string;
}

interface GitHubWorkflowsResponse {
  total_count: number;
  workflows: GitHubWorkflowResponse[];
}

interface GitHubUserResponse {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  email: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.github.com';

  getCurrentUser(): Observable<GitHubUser> {
    return this.http
      .get<GitHubUserResponse>(`${this.apiUrl}/user`)
      .pipe(map((user) => this.mapUser(user)));
  }

  getRepositories(): Observable<GitHubRepository[]> {
    const params = new HttpParams()
      .set('affiliation', 'owner,collaborator,organization_member')
      .set('sort', 'updated')
      .set('direction', 'desc')
      .set('per_page', '100');

    return this.http
      .get<GitHubRepositoryResponse[]>(`${this.apiUrl}/user/repos`, { params })
      .pipe(map((repositories) => repositories.map((repository) => this.mapRepository(repository))));
  }

  getRepository(owner: string, name: string): Observable<GitHubRepository> {
    return this.http
      .get<GitHubRepositoryResponse>(`${this.apiUrl}/repos/${owner}/${name}`)
      .pipe(map((repository) => this.mapRepository(repository)));
  }

  getBranches(owner: string, name: string): Observable<GitHubBranch[]> {
    const params = new HttpParams().set('per_page', '100');

    return this.http
      .get<GitHubBranchResponse[]>(`${this.apiUrl}/repos/${owner}/${name}/branches`, { params })
      .pipe(map((branches) => branches.map((branch) => this.mapBranch(branch))));
  }

  getWorkflows(owner: string, name: string): Observable<GitHubWorkflow[]> {
    const params = new HttpParams().set('per_page', '100');

    return this.http
      .get<GitHubWorkflowsResponse>(`${this.apiUrl}/repos/${owner}/${name}/actions/workflows`, {
        params
      })
      .pipe(map((response) => response.workflows.map((workflow) => this.mapWorkflow(workflow))));
  }

  private mapOwner(owner: GitHubOwnerResponse): GitHubOwner {
    return {
      login: owner.login,
      id: owner.id,
      avatarUrl: owner.avatar_url,
      htmlUrl: owner.html_url,
      type: owner.type
    };
  }

  private mapRepository(repository: GitHubRepositoryResponse): GitHubRepository {
    return {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      private: repository.private,
      htmlUrl: repository.html_url,
      owner: this.mapOwner(repository.owner),
      fork: repository.fork,
      archived: repository.archived,
      disabled: repository.disabled,
      defaultBranch: repository.default_branch,
      language: repository.language,
      stargazersCount: repository.stargazers_count,
      forksCount: repository.forks_count,
      openIssuesCount: repository.open_issues_count,
      updatedAt: repository.updated_at,
      pushedAt: repository.pushed_at
    };
  }

  private mapBranch(branch: GitHubBranchResponse): GitHubBranch {
    return {
      name: branch.name,
      protected: branch.protected,
      commit: {
        sha: branch.commit.sha,
        url: branch.commit.url
      }
    };
  }

  private mapWorkflow(workflow: GitHubWorkflowResponse): GitHubWorkflow {
    return {
      id: workflow.id,
      name: workflow.name,
      path: workflow.path,
      state: workflow.state,
      createdAt: workflow.created_at,
      updatedAt: workflow.updated_at,
      url: workflow.url,
      htmlUrl: workflow.html_url,
      badgeUrl: workflow.badge_url
    };
  }

  private mapUser(user: GitHubUserResponse): GitHubUser {
    return {
      login: user.login,
      id: user.id,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      name: user.name,
      email: user.email
    };
  }
}

