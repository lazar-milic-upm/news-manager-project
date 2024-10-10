import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Article } from '../interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news-service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {
    article: Article | null | undefined;
    articleId: string | null | undefined;

    constructor(private route: ActivatedRoute, private newsService: NewsService) {}

    ngOnInit(): void {
        this.articleId = String(this.route.snapshot.paramMap.get('id'));

        if(this.articleId){
            this.newsService.getArticle(this.articleId).subscribe({
                next: (data) => {
                    this.article = data;
                },
                error: (err) => {
                    console.log('Error in getting article: ' + err);
                },
            });
        }
    }
}
