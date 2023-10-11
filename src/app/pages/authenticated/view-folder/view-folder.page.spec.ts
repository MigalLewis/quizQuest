import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFolderPage } from './view-folder.page';

describe('ViewFolderPage', () => {
  let component: ViewFolderPage;
  let fixture: ComponentFixture<ViewFolderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
