import { Component, OnInit, Input } from '@angular/core';
import { Article } from '@angular-ngrx-nx/home/src/+state/home.interfaces';

@Component({
	selector: 'article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent {

	@Input() articles: Article[];

}
