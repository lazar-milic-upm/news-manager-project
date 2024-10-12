import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css'],
  standalone: true,
  imports: [FormsModule, NgFor, NgIf]
})
export class ArticleEditionComponent implements OnInit {
  article: Article = {
    id: 0,
    title: '',
    abstract: '',
    subtitle: '',
    body: '',
    update_date: new Date(),
    modifiedDate: new Date(),
    category: '', 
  };
  categories: string[] = ['National', 'Economy', 'Sports', 'Technology'];
  isEditing: boolean = false;
  feedbackMessage: string | null = null;

  constructor(
    private newsService: NewsService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.isEditing = true;
      this.loadArticle(articleId);
    }
  }

  loadArticle(id: string) {
    this.newsService.getArticle(id).subscribe(article => {
      this.article = article;
    });
  }

  onSubmit() {
    if (this.article.title && this.article.subtitle && this.article.abstract && this.article.category) {
      if (this.isEditing) {
        this.article.modifiedDate = new Date();  // Set modified date
        this.newsService.updateArticle(this.article).subscribe(() => {
          this.feedbackMessage = 'Article updated successfully!';
        });
      } else {
        this.article.update_date = new Date();  // Set creation date for new article
        this.newsService.createArticle(this.article).subscribe(() => {
          this.feedbackMessage = 'Article created successfully!';
        });
      }
    } else {
      this.feedbackMessage = 'Please fill in all the required fields!';
    }
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.article.image_data = e.target.result; // Base64 encoding of the image
      };
      reader.readAsDataURL(file);
    }
  }
}
