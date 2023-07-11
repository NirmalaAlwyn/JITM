import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdcallerinfoComponent } from './vdcallerinfo.component';

describe('VdcallerinfoComponent', () => {
  let component: VdcallerinfoComponent;
  let fixture: ComponentFixture<VdcallerinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdcallerinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VdcallerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
