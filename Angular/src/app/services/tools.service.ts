import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tool } from '../models/tool.model';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Tool[]>> {
    return this.http.get<ApiResponse<Tool[]>>(`${this.apiUrl}/tools`);
  }

  getById(id: number): Observable<ApiResponse<Tool>> {
    return this.http.get<ApiResponse<Tool>>(`${this.apiUrl}/tools/${id}`);
  }

  getByCategory(category: string): Observable<ApiResponse<Tool[]>> {
    return this.http.get<ApiResponse<Tool[]>>(`${this.apiUrl}/tools/category/${category}`);
  }
}
