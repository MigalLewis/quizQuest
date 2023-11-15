import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReportIssuePage } from './report-issue.page';

describe('ReportIssuePage', () => {
  let component: ReportIssuePage;
  let fixture: ComponentFixture<ReportIssuePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ReportIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
