import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'articleTextFilter',
  standalone: true
})
export class ArticleTextFilterPipe implements PipeTransform {
  transform(articles: Article[], searchText: string): Article[] {
    if (!articles || !searchText) {
      return articles;
    }

    // Filter articles by title or subtitle based on search text
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchText.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
