import { Component, OnInit } from '@angular/core';
import { ArticleState, Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromArticle from './+state/article.reducer';

@Component({
	selector: 'article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
	article: Observable<Article>;

	constructor(private store: Store<ArticleState>) { }

	ngOnInit() {
		this.article = this.store.select(fromArticle.getArticle);
	}
}
