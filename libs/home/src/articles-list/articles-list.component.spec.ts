import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesListComponent } from './articles-list.component';

describe('ArticleComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ArticlesListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
