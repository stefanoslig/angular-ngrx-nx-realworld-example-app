import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '@default/layout/footer/footer.component';
import { NavbarComponent } from '@default/layout/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { AuthFacade, LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/auth';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, StoreModule.forRoot({})],
        declarations: [AppComponent, FooterComponent, NavbarComponent],
        providers: [AuthFacade, LocalStorageJwtService],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
