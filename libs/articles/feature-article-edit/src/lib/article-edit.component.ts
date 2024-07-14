import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleStore } from '@realworld/articles/data-access';

@Component({
  selector: 'cdt-article-edit',
  standalone: true,
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditComponent implements OnDestroy {
  private readonly articleStore = inject(ArticleStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tagList: [''],
  });

  readonly setArticleDataToForm = effect(() => {
    const articleLoaded = this.articleStore.getArticleLoaded();
    if (articleLoaded) {
      this.form.patchValue({
        title: this.articleStore.data.title(),
        description: this.articleStore.data.description(),
        body: this.articleStore.data.body(),
        tagList: this.articleStore.data.tagList().join(', '),
      });
    }
  });

  onSubmit() {
    if (this.articleStore.data.slug()) {
      this.articleStore.editArticle(this.form.getRawValue());
    } else {
      this.articleStore.publishArticle({
        article: { ...this.form.getRawValue(), tagList: this.form.controls.tagList.value.split(',') },
      });
    }
  }

  ngOnDestroy() {
    this.form.reset();
  }
}
