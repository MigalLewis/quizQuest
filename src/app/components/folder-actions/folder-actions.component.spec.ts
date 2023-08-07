import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderActionsComponent } from './folder-actions.component';

describe('FolderActionsComponent', () => {
  let component: FolderActionsComponent;
  let fixture: ComponentFixture<FolderActionsComponent>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(FolderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
