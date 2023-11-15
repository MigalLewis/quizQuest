import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataPrivacyPage } from './data-privacy.page';

describe('DataPrivacyPage', () => {
  let component: DataPrivacyPage;
  let fixture: ComponentFixture<DataPrivacyPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DataPrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
