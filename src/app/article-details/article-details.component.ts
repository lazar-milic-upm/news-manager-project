import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news-service';
import { LoginService } from '../services/login.service';
import { Article } from '../interfaces/article';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    private location: Location,
    private loginService: LoginService) {}

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
    return this.loginService.isLogged();
  }

  goBackToArticles() {
    this.router.navigate(['/article-list']);
  }

  editArticle(): void {
    if (this.article) {
        console.log('Navigating to edit article with ID:', this.article.id);
        this.router.navigate(['/article-edition', this.article.id]);
    }
  }

  confirmAndRemoveArticle(): void {
    if (this.article && window.confirm('Are you sure you want to remove this article?')) {
      this.newsService.deleteArticle(this.article.id).subscribe({
        next: () => {
          alert('Article removed successfully.');
          this.router.navigate(['/articles']);
        },
        error: (err) => {
          alert('Failed to remove article. Please try again.');
          console.error('Error removing article:', err);
        }
      });
    }
  }

}
