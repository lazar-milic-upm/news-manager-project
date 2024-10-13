import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Location } from '@angular/common';

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
    image_data: '',
    username: '',
    thumbnail_image: ''
  };
  categories: string[] = ['National', 'Economy', 'Sports', 'Technology'];
  isEditing: boolean = false;
  feedbackMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private newsService: NewsService, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.isEditing = true;
      this.loadArticle(articleId);
    }
  }

  loadArticle(id: string) {
    this.loading = true;
    this.newsService.getArticle(id).subscribe({
      next: article => {
        this.article = article;
        this.loading = false;
      },
      error: err => {
        this.feedbackMessage = 'Error loading article.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.article) {
        console.log('Article to be updated:', this.article);
        this.newsService.updateArticle(this.article).subscribe({
            next: (updatedArticle) => {
                if (updatedArticle) {
                    this.feedbackMessage = 'Article updated successfully!';
                    this.loading = false;
                    this.router.navigate(['/article-details', updatedArticle.id]); // Navigate to article details
                } else {
                    this.feedbackMessage = 'Failed to update article.';
                    this.loading = false;
                }
            },
            error: err => {
                this.feedbackMessage = 'An error occurred while updating the article.';
                this.loading = false;
                console.error('Update error:', err);
            }
        });
    } else {
        this.feedbackMessage = 'Invalid article data.';
    }
  }


  
  goBack() {
    this.location.back();
  }
  
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.article.image_data = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
