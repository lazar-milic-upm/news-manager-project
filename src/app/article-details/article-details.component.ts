import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news-service';
import { Article } from '../interfaces/article';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule],  // Add CommonModule here
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private router: Router) {}

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

  isLoggedIn(): boolean {
    return true;
  }

  editArticle(): void {
    if (this.article) {
      this.router.navigate(['/edit-article', this.article.id]);
    }
  }
}
