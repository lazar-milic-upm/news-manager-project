import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component'; // Import the new component

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: ArticleListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'article-detail/:id', component: ArticleDetailComponent } // Route for article detail with ID
];
