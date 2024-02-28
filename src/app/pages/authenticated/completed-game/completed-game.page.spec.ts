import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedGamePage } from './completed-game.page';

describe('CompletedGamePage', () => {
  let component: CompletedGamePage;
  let fixture: ComponentFixture<CompletedGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompletedGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
