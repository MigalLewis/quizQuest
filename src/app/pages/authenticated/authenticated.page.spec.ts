import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AuthenticatedPage } from './authenticated.page';
import { provideRouter } from '@angular/router';

describe('AuthenticatedPage', () => {
  let component: AuthenticatedPage;
  let fixture: ComponentFixture<AuthenticatedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AuthenticatedPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
