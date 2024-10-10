import { Component, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { Article } from '../interfaces/article'
import { NewsService } from '../services/news-service';

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
  message: string | null | undefined;

  constructor(private newsService: NewsService) {}

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
}