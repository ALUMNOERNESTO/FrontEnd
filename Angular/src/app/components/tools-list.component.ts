import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToolsService } from '../services/tools.service';
import { Tool } from '../models/tool.model';

@Component({
  selector: 'app-tools-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="row mb-4">
        <div class="col">
          <h1 class="display-5 fw-bold">
            <i class="bi bi-list-check"></i> Tools
          </h1>
          <p class="text-muted">
            Discover and explore our collection of development tools
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

      <div *ngIf="!loading() && tools().length > 0" class="row g-4">
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
        *ngIf="!loading() && tools().length === 0"
        class="alert alert-info"
        role="alert"
      >
        No tools found.
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
export class ToolsListComponent implements OnInit {
  tools = signal<Tool[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private toolsService: ToolsService) {}

  ngOnInit(): void {
    this.loadTools();
  }

  loadTools(): void {
    this.loading.set(true);
    this.error.set(null);
    this.toolsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.tools.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tools. Please try again later.');
        this.loading.set(false);
        console.error('Error loading tools:', err);
      }
    });
  }
}
