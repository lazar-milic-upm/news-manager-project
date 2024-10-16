import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf,CommonModule } from '@angular/common';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArticleCategoryFilterPipe } from '../pipes/article-category-filter.pipe';
import { ArticleTextFilterPipe } from '../pipes/article-text-filter.pipe';
import { LoginService } from '../services/login.service';
import { HeaderComponent } from "../header/header.component";

declare var bootstrap: any;
@Component({
    selector: 'app-article-list',
    standalone: true,
    imports: [HeaderComponent, NgFor, NgIf, FormsModule, ArticleCategoryFilterPipe, ArticleTextFilterPipe, CommonModule ],
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit{

    articles: Article[] = [];
    article: Article | undefined;
    isLoading = true;
    error: string | null = null;
    category: string = 'All';
    searchText: string = '';
    username: string | null | undefined;
    selectedPill: string = 'All';

    constructor(private newsService: NewsService, private router: Router, public loginService: LoginService) {}

    ngOnInit(): void {

      if(this.isLoggedIn())
         this.username = this.loginService.getUser()?.username;

      this.newsService.getArticles().subscribe({
          next: (data) => {
              this.articles = data;
              this.isLoading = false;
              console.log('Fetched articles:', this.articles);
          },
          error: (err) => {
              this.error = 'Failed to load articles. Please try again later.';
              this.isLoading = false;
              console.error('Error fetching articles:', err);
          },
        });
    }

    isLoggedIn(): boolean {
        return this.loginService.isLogged();
    }

    navigateToArticle(articleId: string) {
        this.router.navigate(['/article-details', articleId]);
    }

    setCategory(category: string): void {
        this.category = category;
        console.log('Selected category:', this.category);
    }

    onSearchChange(value: string) {
        console.log('Search Text Updated:', value);
        this.searchText = value;
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }

    login() {
        this.router.navigate(['/login']);
    }

    navigateToCreateArticle() {
        this.router.navigate(['/article-create']);
    }

    confirmAndRemoveArticle(articleId: string): void {
        if (window.confirm('Are you sure you want to remove this article?')) {
            this.newsService.deleteArticle(articleId).subscribe({
                next: () => {
                    alert('Article removed successfully.');
                    this.articles = this.articles.filter(article => article.id !== articleId);
                },
                error: (err) => {
                    alert('Failed to remove article. Please try again.');
                    console.error('Error removing article:', err);
                }
            });
        }
    }

    selectPill(pill: string): void {
        this.selectedPill = pill; 
        this.setCategory(pill);
    }  
}