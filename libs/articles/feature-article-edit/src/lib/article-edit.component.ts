import { DynamicFormComponentModule, Field, ListErrorsComponentModule, NgrxFormsFacade } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ArticlesFacade } from '@realworld/articles/data-access';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'title',
    placeholder: 'Article Title',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'description',
    placeholder: "What's this article about?",
    validator: [Validators.required],
  },
  {
    type: 'TEXTAREA',
    name: 'body',
    placeholder: 'Write your article (in markdown)',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'tagList',
    placeholder: 'Enter Tags',
    validator: [],
  },
];

@UntilDestroy()
@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  structure$ = this.ngrxFormsFacade.structure$;
  data$ = this.ngrxFormsFacade.data$;

  constructor(private ngrxFormsFacade: NgrxFormsFacade, private facade: ArticlesFacade) {}

  ngOnInit() {
    this.ngrxFormsFacade.setStructure(structure);
    this.facade.article$.pipe(untilDestroyed(this)).subscribe((article) => this.ngrxFormsFacade.setData(article));
  }

  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  submit() {
    this.facade.publishArticle();
  }

  ngOnDestroy() {
    this.ngrxFormsFacade.initializeForm();
    this.facade.initializeArticle();
  }
}

@NgModule({
  imports: [DynamicFormComponentModule, ListErrorsComponentModule],
  declarations: [ArticleEditComponent],
  exports: [ArticleEditComponent],
})
export class ArticleEditComponentModule {}
