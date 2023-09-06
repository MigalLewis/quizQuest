import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderOptionsComponent } from './folder-options.component';

describe('FolderOptionsComponent', () => {
  let component: FolderOptionsComponent;
  let fixture: ComponentFixture<FolderOptionsComponent>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(FolderOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
