import { authGuard } from './auth.guard';
import { adminAuthGuard } from './admin-auth.guard';

import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('./pages/main/welcome/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'search', loadComponent: () => import('./pages/main/search/search.component').then(m => m.SearchComponent) },
  { path: 'register', loadComponent: () => import('./pages/main/register/register.component').then(m => m.RegisterComponent) },
  { path: 'order-management', loadComponent: () => import('./pages/admin/order-management/order-management.component').then(m => m.OrderManagementComponent),  canActivate: [adminAuthGuard]},
  { path: 'concert-management', loadComponent: () => import('./pages/admin/concert-management/concert-management.component').then(m => m.ConcertManagementComponent),canActivate: [adminAuthGuard] },
  {path:'search/:id', loadComponent: () => import('./pages/main/search/search-detail/search-detail.component').then(m => m.SearchDetailComponent)},
  { path: 'login', loadComponent: () => import('./pages/main/login/login.component').then(m => m.LoginComponent) },
  {path:'user', loadComponent: () => import('./pages/main/user/user.component').then(m => m.UserComponent),  canActivate: [authGuard]},
  {path:'order', loadComponent: () => import('./pages/main/order/order.component').then(m => m.OrderComponent),  canActivate: [authGuard]},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**',loadComponent: () => import('./pages/main/welcome/welcome.component').then(m => m.WelcomeComponent)}

];

