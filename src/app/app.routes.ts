import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: ArticleListComponent },
    { path: 'login', component: LoginComponent },
];
