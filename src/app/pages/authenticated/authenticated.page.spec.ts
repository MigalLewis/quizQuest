import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';
import { AuthenticatedPage } from './authenticated.page';

describe('AuthenticatedPage', () => {
  let component: AuthenticatedPage;
  let fixture: ComponentFixture<AuthenticatedPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(AuthenticatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
