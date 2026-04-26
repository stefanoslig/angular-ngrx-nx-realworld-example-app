import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cdt-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 160px);
        padding: var(--sp-32) var(--sp-16);
      }
      .not-found {
        max-width: 560px;
        text-align: center;
      }
      .not-found h1 {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: var(--fs-44);
        color: var(--ink-900);
        letter-spacing: -0.02em;
        margin-bottom: var(--sp-8);
      }
      .not-found p {
        font-family: var(--font-display);
        font-style: italic;
        font-size: var(--fs-18);
        color: var(--ink-500);
        margin-bottom: var(--sp-24);
      }
    `,
  ],
})
export class NotFoundComponent {}
