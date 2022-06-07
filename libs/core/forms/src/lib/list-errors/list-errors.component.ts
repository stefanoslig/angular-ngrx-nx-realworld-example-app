import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgrxFormsFacade } from '../+state/forms.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-list-errors',
  standalone: true,
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors: string[] = [];

  constructor(private ngrxFormsFacade: NgrxFormsFacade, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.ngrxFormsFacade.errors$.pipe(untilDestroyed(this)).subscribe((e) => {
      this.errors = Object.keys(e || {}).map((key) => `${key} ${e[key]}`);
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.ngrxFormsFacade.initializeErrors();
  }
}
