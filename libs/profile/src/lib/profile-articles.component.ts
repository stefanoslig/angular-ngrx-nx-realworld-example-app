import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileArticlesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
