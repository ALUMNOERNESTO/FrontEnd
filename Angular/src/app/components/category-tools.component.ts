import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../services/tools.service';
import { Tool } from '../models/tool.model';

@Component({
  selector: 'app-category-tools',
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

      <div *ngIf="!loading() && category()">
        <a routerLink="/categories" class="btn btn-outline-secondary mb-4">
          <i class="bi bi-arrow-left"></i> Back to Categories
        </a>

        <div class="row mb-4">
          <div class="col">
            <h1 class="display-5 fw-bold">
              <i class="bi bi-tag"></i> {{ category() }} Tools
            </h1>
            <p class="text-muted">
              Found {{ tools().length }} tool(s) in this category
            </p>
          </div>
        </div>

        <div *ngIf="tools().length > 0" class="row g-4">
          <div *ngFor="let tool of tools()" class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="card-title">{{ tool.name }}</h5>
                  <span class="badge bg-primary">{{ tool.category }}</span>
                </div>
                <p class="card-text text-muted">{{ tool.description }}</p>
                <p class="text-sm text-secondary">
                  <small>Version: {{ tool.version }}</small>
                </p>
              </div>
              <div class="card-footer bg-light border-0">
                <a
                  [routerLink]="['/tools', tool.id]"
                  class="btn btn-sm btn-outline-primary"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          *ngIf="tools().length === 0"
          class="alert alert-info"
          role="alert"
        >
          No tools found in this category.
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .hover-shadow {
        transition: box-shadow 0.3s ease;
      }
      .hover-shadow:hover {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      }
    `
  ]
})
export class CategoryToolsComponent implements OnInit {
  tools = signal<Tool[]>([]);
  category = signal<string | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryName = params['name'];
      if (categoryName) {
        this.category.set(categoryName);
        this.loadToolsByCategory(categoryName);
      }
    });
  }

  loadToolsByCategory(category: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.toolsService.getByCategory(category).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.tools.set(response.data);
        } else {
          this.error.set(response.message || 'No tools found');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          'Failed to load tools by category. Please try again later.'
        );
        this.loading.set(false);
        console.error('Error loading tools:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
