import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreGamePage } from './pre-game.page';

describe('PreGamePage', () => {
  let component: PreGamePage;
  let fixture: ComponentFixture<PreGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
