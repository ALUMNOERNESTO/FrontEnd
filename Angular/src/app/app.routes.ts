import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ToolsListComponent } from './components/tools-list.component';
import { ToolDetailComponent } from './components/tool-detail.component';
import { CategoriesComponent } from './components/categories.component';
import { CategoryToolsComponent } from './components/category-tools.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tools', component: ToolsListComponent },
  { path: 'tools/:id', component: ToolDetailComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:name', component: CategoryToolsComponent },
  { path: '**', redirectTo: '' }
];
