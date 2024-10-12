import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleEditionComponent } from './article-edition/article-edition.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ArticleListComponent },
    { path: 'article-detail/:id', component: ArticleDetailComponent },
    { path: '**', redirectTo: 'login' },
    { path: 'article-edit/:id', component: ArticleEditionComponent },
    { path: 'article-create', component: ArticleEditionComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
