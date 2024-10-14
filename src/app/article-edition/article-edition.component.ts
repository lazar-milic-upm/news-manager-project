import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, Location } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, QuillModule, ReactiveFormsModule]
})
export class ArticleEditionComponent implements OnInit {
  article: Article = {
    id: '',
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
  articleForm: FormGroup;

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,) {
      this.articleForm = this.fb.group({
        title: ['', Validators.required],
        subtitle: ['', Validators.required],
        abstract: ['', Validators.required],
        category: ['', Validators.required],
        body: ['']
      });
  }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
        this.isEditing = true;
        this.article.id = articleId;
        this.loadArticle(articleId);
    }
  }

  loadArticle(articleId: string) {
    this.loading = true;
    this.newsService.getArticle(articleId).subscribe({
        next: article => {
            this.article = article;
            this.loading = false;
            this.articleForm.value.body = this.article.body;
        },
        error: err => {
            this.feedbackMessage = 'Error loading article.';
            
            this.loading = false;
            console.error(err);
        }
    });
  }

  deleteArticle(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this article?');
    
    if (confirmation) {
      /*
      this.articleService.deleteArticle(id).subscribe(() => {
        console.log('Article deleted');
      });*/
      console.log('Article deleted');
    } else {
      console.log('Deletion canceled');
    }
  }

  onSubmit() {
    if (this.article) {
        console.log('Article to be updated/created:', this.article);
        if(this.isEditing){
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
        }
        else{
          this.newsService.createArticle(this.article).subscribe({
            next: (createdArticle) => {
                if (createdArticle) {
                    this.feedbackMessage = 'Article created successfully!';
                    this.loading = false;
                    this.router.navigate(['/article-details', createdArticle.id]); // Navigate to article details
                } else {
                    this.feedbackMessage = 'Failed to create article.';
                    this.loading = false;
                }
            },
            error: err => {
                this.feedbackMessage = 'An error occurred while updating the article.';
                this.loading = false;
                console.error('Update error:', err);
            }
        });
        }
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
