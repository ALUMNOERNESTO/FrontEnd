import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../services/tools.service';
import { Tool } from '../models/tool.model';

@Component({
  selector: 'app-tool-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div *ngIf="loading()" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error()" class="alert alert-danger" role="alert">
        <strong>Error:</strong> {{ error() }}
        <button
          class="btn btn-sm btn-outline-danger ms-2"
          (click)="goBack()"
        >
          Go Back
        </button>
      </div>

      <div *ngIf="!loading() && tool()" class="row">
        <div class="col-lg-8 mx-auto">
          <a routerLink="/tools" class="btn btn-outline-secondary mb-4">
            <i class="bi bi-arrow-left"></i> Back to Tools
          </a>

          <div class="card shadow">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h1 class="display-5 fw-bold">{{ tool()!.name }}</h1>
                  <p class="text-muted lead">{{ tool()!.description }}</p>
                </div>
                <span class="badge bg-success" style="font-size: 0.875rem">
                  {{ tool()!.category }}
                </span>
              </div>

              <hr />

              <div class="row mt-4">
                <div class="col-md-6">
                  <h5 class="fw-bold mb-3">Tool Information</h5>
                  <ul class="list-unstyled">
                    <li class="mb-2">
                      <strong>ID:</strong>
                      <span class="badge bg-light text-dark">
                        {{ tool()!.id }}
                      </span>
                    </li>
                    <li class="mb-2">
                      <strong>Name:</strong> {{ tool()!.name }}
                    </li>
                    <li class="mb-2">
                      <strong>Category:</strong>
                      <span class="badge bg-info">{{ tool()!.category }}</span>
                    </li>
                    <li class="mb-2">
                      <strong>Version:</strong>
                      <span class="badge bg-warning text-dark">
                        {{ tool()!.version }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <h5 class="fw-bold mb-3">Description</h5>
                  <p class="text-muted">{{ tool()!.description }}</p>
                </div>
              </div>

              <div class="mt-4 pt-4 border-top">
                <a routerLink="/tools" class="btn btn-primary me-2">
                  <i class="bi bi-list"></i> All Tools
                </a>
                <a
                  [routerLink]="['/category', tool()!.category]"
                  class="btn btn-outline-primary"
                >
                  <i class="bi bi-funnel"></i>
                  Other {{ tool()!.category }} tools
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ToolDetailComponent implements OnInit {
  tool = signal<Tool | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadTool(id);
      }
    });
  }

  loadTool(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.toolsService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.tool.set(response.data);
        } else {
          this.error.set(response.message || 'Tool not found');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tool details. Please try again later.');
        this.loading.set(false);
        console.error('Error loading tool:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/tools']);
  }
}
