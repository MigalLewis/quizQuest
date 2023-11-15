import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuidedVideosPage } from './guided-videos.page';

describe('GuidedVideosPage', () => {
  let component: GuidedVideosPage;
  let fixture: ComponentFixture<GuidedVideosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuidedVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
