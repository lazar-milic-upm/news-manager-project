import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'articleTextFilter',
  standalone: true,
})
export class ArticleTextFilterPipe implements PipeTransform {
  transform(articles: Article[], searchText: string): Article[] {
    if (!articles || !searchText) {
      return articles;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return articles.filter(article =>
      article.title.toLowerCase().includes(lowerCaseSearchText) ||
      article.subtitle.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}
