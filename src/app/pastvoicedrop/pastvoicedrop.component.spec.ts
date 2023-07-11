import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastvoicedropComponent } from './pastvoicedrop.component';

describe('PastvoicedropComponent', () => {
  let component: PastvoicedropComponent;
  let fixture: ComponentFixture<PastvoicedropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastvoicedropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastvoicedropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
