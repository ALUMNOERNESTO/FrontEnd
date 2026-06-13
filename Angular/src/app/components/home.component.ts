import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1 class="display-4 fw-bold mb-4">
            <i class="bi bi-tools text-primary"></i> Tools Manager
          </h1>
          <p class="lead text-muted mb-4">
            Explore and manage your favorite development tools in one place.
            Browse by categories, view details, and discover the perfect tools
            for your projects.
          </p>
          <div class="d-flex gap-2">
            <a routerLink="/tools" class="btn btn-primary btn-lg">
              <i class="bi bi-list-check"></i> Explore Tools
            </a>
            <a routerLink="/categories" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-collection"></i> Browse Categories
            </a>
          </div>
        </div>
        <div class="col-lg-6 text-center mt-4 mt-lg-0">
          <div class="display-1 text-primary opacity-10">
            <i class="bi bi-tools"></i>
          </div>
        </div>
      </div>

      <hr class="my-5" />

      <div class="row mt-5">
        <div class="col-md-4 mb-4">
          <div class="card h-100 text-center border-0 shadow-sm">
            <div class="card-body">
              <div class="display-6 text-success mb-3">
                <i class="bi bi-list-check-2"></i>
              </div>
              <h5 class="card-title fw-bold">{{ toolCount() }} Tools</h5>
              <p class="text-muted">
                Explore a collection of development tools
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 text-center border-0 shadow-sm">
            <div class="card-body">
              <div class="display-6 text-info mb-3">
                <i class="bi bi-collection"></i>
              </div>
              <h5 class="card-title fw-bold">{{ categoryCount() }} Categories</h5>
              <p class="text-muted">
                Organize tools by their category
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 text-center border-0 shadow-sm">
            <div class="card-body">
              <div class="display-6 text-warning mb-3">
                <i class="bi bi-search"></i>
              </div>
              <h5 class="card-title fw-bold">Easy Search</h5>
              <p class="text-muted">
                Find tools quickly by name or category
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  toolCount = signal(0);
  categoryCount = signal(0);

  constructor(private toolsService: ToolsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.toolsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.toolCount.set(response.data.length);

          // Count unique categories
          const categories = new Set(response.data.map((tool) => tool.category));
          this.categoryCount.set(categories.size);
        }
      },
      error: (err) => {
        console.error('Error loading stats:', err);
      }
    });
  }
}
