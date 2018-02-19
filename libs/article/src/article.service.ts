import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { Article, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ArticleService {
	constructor(private apiService: ApiService) { }

	get(slug: string): Observable<Article> {
		return this.apiService.get('/articles/' + slug).pipe(map((data: any) => data.article));
	}

	getComments(slug: string): Observable<ArticleComment[]> {
		return this.apiService.get(`/articles/${slug}/comments`).pipe(map((data: any) => data.comments));
	}

	deleteArticle(slug: string) {
		return this.apiService.delete('/articles/' + slug);
	}

	deleteComment(commentId: number, slug: string) {
		return this.apiService
			.delete(`/articles/${slug}/comments/${commentId}`);
	}
}
