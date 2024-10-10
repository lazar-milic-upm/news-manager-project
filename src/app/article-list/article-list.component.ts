import { Component, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article'
import { NewsService } from '../services/news-service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{

  articles: Article[] | undefined;
  article: Article | null | undefined;
  message: string | null | undefined;

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.newsService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        console.log('getArticles(): ' + JSON.stringify(this.articles));
      },
      error: (err) => {
        console.log('getArticles() error: ' + err);
      },
    });
  }
  
  navigateToArticle(id: number): void {
    this.router.navigate(['/articles', id]);
  }
}