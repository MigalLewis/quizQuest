import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewPhotoPage } from './view-photo.page';

describe('ViewPhotoPage', () => {
  let component: ViewPhotoPage;
  let fixture: ComponentFixture<ViewPhotoPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ViewPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});