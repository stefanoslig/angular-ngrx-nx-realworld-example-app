import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ArticleStore } from '@realworld/articles/data-access';
import { TagChipComponent } from '@realworld/ui/components';
import { MarkdownPipe } from '@realworld/articles/article';

@Component({
  selector: 'cdt-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent, TagChipComponent, MarkdownPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditComponent implements OnDestroy {
  private readonly articleStore = inject(ArticleStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  /** Pending tag input (the text the user is currently typing). */
  tagInput = new FormControl('', { nonNullable: true });

  /** Accumulated tags. */
  readonly tags = signal<string[]>([]);

  // Debounced signals for the live preview.
  readonly $previewTitle = toSignal(this.form.controls.title.valueChanges.pipe(debounceTime(150), startWith('')), {
    initialValue: '',
  });
  readonly $previewSubtitle = toSignal(
    this.form.controls.description.valueChanges.pipe(debounceTime(150), startWith('')),
    { initialValue: '' },
  );
  readonly $previewBody = toSignal(this.form.controls.body.valueChanges.pipe(debounceTime(150), startWith('')), {
    initialValue: '',
  });

  readonly $previewHasContent = computed(() =>
    Boolean(this.$previewTitle() || this.$previewSubtitle() || this.$previewBody()),
  );

  readonly setArticleDataToForm = effect(() => {
    const articleLoaded = this.articleStore.getArticleLoaded();
    if (articleLoaded) {
      this.form.patchValue({
        title: this.articleStore.data.title(),
        description: this.articleStore.data.description(),
        body: this.articleStore.data.body(),
      });
      this.tags.set(this.articleStore.data.tagList());
    }
  });

  /** Called on Enter or comma keypress in the chip input. */
  onTagKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.commitPendingTag();
    } else if (event.key === 'Backspace' && !this.tagInput.value && this.tags().length) {
      // Let Backspace pop the last chip when the input is empty.
      event.preventDefault();
      this.tags.update((arr) => arr.slice(0, -1));
    }
  }

  private commitPendingTag(): void {
    const raw = this.tagInput.value.trim().replace(/,$/, '').trim();
    if (!raw) return;
    if (this.tags().includes(raw)) {
      this.tagInput.setValue('');
      return;
    }
    this.tags.update((arr) => [...arr, raw]);
    this.tagInput.setValue('');
  }

  removeTag(index: number): void {
    this.tags.update((arr) => arr.filter((_, i) => i !== index));
  }

  onSubmit() {
    // Commit any text still in the tag input before submitting.
    this.commitPendingTag();

    const article = {
      article: {
        ...this.form.getRawValue(),
        tagList: this.tags(),
      },
    };
    if (this.articleStore.data.slug()) {
      this.articleStore.editArticle({ editArticle: article, slug: this.articleStore.data.slug() });
    } else {
      this.articleStore.publishArticle(article);
    }
  }

  ngOnDestroy() {
    this.form.reset();
    this.tags.set([]);
    this.tagInput.reset('');
  }
}
