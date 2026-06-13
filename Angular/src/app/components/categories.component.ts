import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToolsService } from '../services/tools.service';
import { Tool } from '../models/tool.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="row mb-4">
        <div class="col">
          <h1 class="display-5 fw-bold">
            <i class="bi bi-collection"></i> Categories
          </h1>
          <p class="text-muted">
            Browse tools by category
          </p>
        </div>
      </div>

      <div *ngIf="loading()" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error()" class="alert alert-danger" role="alert">
        <strong>Error:</strong> {{ error() }}
      </div>

      <div *ngIf="!loading() && categories().length > 0" class="row g-4">
        <div *ngFor="let cat of categories()" class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm hover-shadow border-0">
            <div class="card-body text-center">
              <div class="display-6 mb-3 text-primary">
                <i class="bi bi-tag-fill"></i>
              </div>
              <h5 class="card-title fw-bold">{{ cat.name }}</h5>
              <p class="text-muted mb-3">
                {{ cat.count }} tool{{ cat.count !== 1 ? 's' : '' }}
              </p>
              <a
                [routerLink]="['/category', cat.name]"
                class="btn btn-primary btn-sm"
              >
                View Tools
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        *ngIf="!loading() && categories().length === 0"
        class="alert alert-info"
        role="alert"
      >
        No categories found.
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
export class CategoriesComponent implements OnInit {
  categories = signal<{ name: string; count: number }[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private toolsService: ToolsService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.error.set(null);
    this.toolsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const tools = response.data;
          const categoriesMap = new Map<string, number>();

          tools.forEach((tool) => {
            const count = categoriesMap.get(tool.category) || 0;
            categoriesMap.set(tool.category, count + 1);
          });

          const categoriesArray = Array.from(categoriesMap).map(([name, count]) => ({
            name,
            count
          }));

          this.categories.set(categoriesArray);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load categories. Please try again later.');
        this.loading.set(false);
        console.error('Error loading categories:', err);
      }
    });
  }
}
