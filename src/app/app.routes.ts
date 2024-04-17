import { authGuard } from './auth.guard';
import { managerGuard } from './manager.guard';
import { Routes } from '@angular/router';



export const routes: Routes = [

  { path: 'welcome', loadComponent: () =>
  import('./pages/main/welcome/welcome.component').then(m => m.WelcomeComponent) },


  { path: 'search', loadComponent: () =>
  import('./pages/main/search/search.component').then(m => m.SearchComponent) },


  { path: 'register', loadComponent: () =>
  import('./pages/main/register/register.component').then(m => m.RegisterComponent) },


  { path: 'order-management', loadComponent: () =>
  import('./pages/admin/order-management/order-management.component').then(m => m.OrderManagementComponent),  canActivate: [managerGuard]},


  { path: 'concert-management', loadComponent: () =>
  import('./pages/admin/concert-management/concert-management.component').then(m => m.ConcertManagementComponent),canActivate: [managerGuard] },


  { path: 'concert-management/create', loadComponent: () =>
  import('./pages/admin/concert-management/add-concert/add-concert.component').then(m => m.AddConcertComponent),canActivate: [managerGuard] },


  { path: 'concert-management/:id', loadComponent: () =>
  import('./pages/admin/concert-management/modify-concert/modify-concert.component').then(m => m.ModifyConcertComponent),canActivate: [managerGuard] },


  {path:'search/:id', loadComponent: () =>
  import('./pages/main/search/search-detail/search-detail.component').then(m => m.SearchDetailComponent),  canActivate: [authGuard] },


  { path: 'login', loadComponent: () =>
  import('./pages/main/login/login.component').then(m => m.LoginComponent) },


  {path:'user', loadComponent: () =>
  import('./pages/main/user/user.component').then(m => m.UserComponent),  canActivate: [authGuard]},


  {path:'order', loadComponent: () =>
  import('./pages/main/order/order.component').then(m => m.OrderComponent),  canActivate: [authGuard]},


  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**',loadComponent: () => import('./pages/main/welcome/welcome.component').then(m => m.WelcomeComponent)}

];

