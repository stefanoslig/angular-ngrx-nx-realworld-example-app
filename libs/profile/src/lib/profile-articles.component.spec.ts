import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArticlesComponent } from './profile-articles.component';

describe('ProfileArticlesComponent', () => {
  let component: ProfileArticlesComponent;
  let fixture: ComponentFixture<ProfileArticlesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileArticlesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
