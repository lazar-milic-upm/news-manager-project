import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ArticleListComponent },
    { path: 'article-detail/:id', component: ArticleDetailComponent },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
