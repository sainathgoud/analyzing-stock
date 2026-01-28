import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStockDetailsComponent } from './display-stock-details.component';

describe('DisplayStockDetailsComponent', () => {
  let component: DisplayStockDetailsComponent;
  let fixture: ComponentFixture<DisplayStockDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayStockDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
