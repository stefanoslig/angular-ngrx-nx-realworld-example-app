import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListItemComponent } from './article-list-item.component';

describe('ArticleListItemComponent', () => {
  let component: ArticleListItemComponent;
  let fixture: ComponentFixture<ArticleListItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ArticleListItemComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
