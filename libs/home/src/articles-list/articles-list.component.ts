import { Component, OnInit, Input } from '@angular/core';
import { Article } from '@angular-ngrx-nx/home/src/+state/home.interfaces';

@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent {
  @Input() articles: Article[];
}
