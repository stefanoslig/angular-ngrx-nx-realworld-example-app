import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cdt-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
