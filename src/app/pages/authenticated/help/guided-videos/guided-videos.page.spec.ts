import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GuidedVideosPage } from './guided-videos.page';

describe('GuidedVideosPage', () => {
  let component: GuidedVideosPage;
  let fixture: ComponentFixture<GuidedVideosPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(GuidedVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
