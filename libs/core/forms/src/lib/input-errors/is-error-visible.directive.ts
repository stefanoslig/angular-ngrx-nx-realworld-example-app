import { AfterViewInit, Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[isErrorVisible]',
})
export class IsErrorVisibleDirective implements AfterViewInit {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  readonly isErrorVisible = input<AbstractControl>();

  ngAfterViewInit() {
    console.log(this.isErrorVisible());
    this.isErrorVisible()
      ?.statusChanges.pipe()
      .subscribe(() => {
        if (this.isErrorVisible()?.invalid && this.isErrorVisible()?.dirty) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
