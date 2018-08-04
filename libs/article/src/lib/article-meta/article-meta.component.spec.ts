import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMetaComponent } from './article-meta.component';

describe('ArticleMetaComponent', () => {
  let component: ArticleMetaComponent;
  let fixture: ComponentFixture<ArticleMetaComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ArticleMetaComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
