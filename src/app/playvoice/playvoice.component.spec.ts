import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayvoiceComponent } from './playvoice.component';

describe('PlayvoiceComponent', () => {
  let component: PlayvoiceComponent;
  let fixture: ComponentFixture<PlayvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
