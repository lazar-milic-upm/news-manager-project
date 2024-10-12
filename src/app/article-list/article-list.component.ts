import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArticleCategoryFilterPipe } from '../pipes/article-category-filter.pipe';
import { ArticleTextFilterPipe } from '../pipes/article-text-filter.pipe';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ArticleCategoryFilterPipe, ArticleTextFilterPipe],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit{

  articles: Article[] = [];
  article: Article | null | undefined;
  isLoading = true;
  error: string | null = null;
  category: string = 'All';
  searchText: string = '';
  isLoggedIn: boolean = false;
  username: string | null | undefined;

  constructor(private newsService: NewsService, private router: Router, public loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLogged();

    if(this.isLoggedIn){
      this.username = this.loginService.getUser()?.username;
    }

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

  navigateToArticle(articleId: number) {
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
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
  
}