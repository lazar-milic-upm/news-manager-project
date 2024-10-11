import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news-service';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-article-details',
  standalone: true,
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.newsService.getArticle(articleId).subscribe({
        next: (article) => {
          this.article = article;
        },
        error: (err) => {
          this.errorMessage = 'Could not load the article details.';
          console.error('Error fetching article: ', err);
        }
      });
    } else {
      this.errorMessage = 'No article ID provided.';
    }
  }
}

