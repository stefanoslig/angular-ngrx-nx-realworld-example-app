import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cdt-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
