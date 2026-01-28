import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardComponent } from './dash-board.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashBoardComponent', () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardComponent],
     // schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
