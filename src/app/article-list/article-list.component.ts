import { Component, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { Article } from '../interfaces/article'
import { NewsService } from '../services/news-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit{

  articles: Article[] | undefined;
  article: Article | null | undefined;
  isLoading = true;
  error: string | null | undefined;

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.newsService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.isLoading = false;
        console.log('getArticles(): ' + JSON.stringify(this.articles));
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      },
    });
  }

  navigateToArticle(articleId: number) {
    this.router.navigate(['/article-detail', articleId]);
  }
}