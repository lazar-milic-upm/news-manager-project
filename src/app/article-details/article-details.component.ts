import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news-service';
import { LoginService } from '../services/login.service';
import { Article } from '../interfaces/article';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, Location, CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule, HeaderComponent],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  errorMessage: string | null = null;
  username: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    private location: Location,
    private loginService: LoginService) {}

  ngOnInit(): void {
    if(this.isLoggedIn())
      this.username = this.loginService.getUser()?.username;
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
    this.router.navigate(['/home']);
  }

  editArticle(): void {
    if (this.article) {
        console.log('Navigating to edit article with ID:', this.article.id);
        this.router.navigate(['/article-edition', this.article.id]);
    }
  }

  //Remove article added here 
  confirmAndRemoveArticle(articleId: string): void {
    if (window.confirm('Are you sure you want to remove this article?')) {
      this.newsService.deleteArticle(articleId).subscribe({
        next: () => {
          alert('Article removed successfully.');
          this.goBackToArticles();
        },
        error: (err) => {
          alert('Failed to remove article. Please try again.');
          console.error('Error removing article:', err);
        }
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
