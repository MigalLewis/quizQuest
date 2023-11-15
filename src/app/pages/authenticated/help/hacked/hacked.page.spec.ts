import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HackedPage } from './hacked.page';

describe('HackedPage', () => {
  let component: HackedPage;
  let fixture: ComponentFixture<HackedPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(HackedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
