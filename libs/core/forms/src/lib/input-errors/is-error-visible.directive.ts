import { AfterViewInit, Directive, TemplateRef, ViewContainerRef, inject, input, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[isErrorVisible]',
})
export class IsErrorVisibleDirective implements AfterViewInit {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly isErrorVisible = input<AbstractControl>();

  ngAfterViewInit() {
    this.isErrorVisible()
      ?.statusChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isErrorVisible()?.invalid && this.isErrorVisible()?.dirty) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
