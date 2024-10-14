import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, Location, CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { LoginService } from '../services/login.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, QuillModule, ReactiveFormsModule, CommonModule, HeaderComponent]
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
  articleId: string | null;
  username: string | null | undefined;

  constructor(private newsService: NewsService, private loginService: LoginService,private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      abstract: ['', Validators.required],
      category: ['', Validators.required],
      body: [''],
      image: [null]
    });
    this.articleId='';
  }

  ngOnInit(): void {
    if(this.isLoggedIn())
      this.username = this.loginService.getUser()?.username;

    this.articleId = this.route.snapshot.paramMap.get('id');
    if (this.articleId) {
        this.isEditing = true;
        this.loadArticle(this.articleId);
    }
    else{
        this.isEditing = false;
      }

      if (this.isEditing && this.article) {
        this.articleForm.patchValue(this.article);
      }
    console.log('isEditing: ' + this.isEditing);
  }

  loadArticle(articleId: string) {
    this.loading = true;
    this.newsService.getArticle(articleId).subscribe({
        next: article => {
            this.article = article;
            console.log('article in load: ' + JSON.stringify(article));
            this.article.id = articleId;
            this.articleForm.controls['title'].setValue(this.article.title);
            this.articleForm.controls['subtitle'].setValue(this.article.subtitle);
            this.articleForm.controls['abstract'].setValue(this.article.abstract);
            this.articleForm.controls['category'].setValue(this.article.category);
            this.articleForm.controls['image'].setValue(this.article.image_data);
            this.articleForm.controls['thumbnail_image'].setValue(this.article.thumbnail_image);
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
    if (this.articleForm.valid) {
        if(this.isEditing && this.article && this.articleId){
          this.article = this.articleForm.value;
          this.article.id=this.articleId;
          console.log('this.article in updateArticle: ' + JSON.stringify(this.article));
          this.newsService.updateArticle(this.article).subscribe({
              next: (updatedArticle) => {
                  if (updatedArticle) {
                      this.feedbackMessage = 'Article updated successfully!';
                      console.log(this.feedbackMessage);
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

          /*this.article = {
            title: this.articleForm.value.title,
            subtitle: this.articleForm.value.subtitle,
            abstract: this.articleForm.value.abstract,
            category: this.articleForm.value.category,
            body: this.articleForm.value.body
          };*/

          if(this.articleForm.valid){
              this.newsService.createArticle(this.articleForm.value).subscribe({
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
        }
    } else {
        this.feedbackMessage = 'Invalid article data.';
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLogged();
  }

  goBack() {
      this.location.back();
  }
  
  onFileSelect(event: any) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
              if(this.article)
                this.article.image_data = e.target.result;
          };
          reader.readAsDataURL(file);
      }
  }

  get form() {
    return this.articleForm;
  }

  get title(){
    return this.articleForm.get('title');
  }
  get subtitle(){
    return this.articleForm.get('subtitle');
  }
  get abstract(){
    return this.articleForm.get('abstract');
  }
  get category(){
    return this.articleForm.get('category');
  }
  get body(){
    return this.articleForm.get('body');
  }
  get image(){
    return this.articleForm.get('image');
  }
}
