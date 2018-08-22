import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '@default/layout/footer/footer.component';
import { NavbarComponent } from '@default/layout/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { LocalStorageJwtService, CoreModule } from '@angular-ngrx-nx-realworld-example-app/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, CoreModule, StoreModule.forRoot({})],
        declarations: [AppComponent, FooterComponent, NavbarComponent],
        providers: [LocalStorageJwtService]
      }).compileComponents();
    })
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
