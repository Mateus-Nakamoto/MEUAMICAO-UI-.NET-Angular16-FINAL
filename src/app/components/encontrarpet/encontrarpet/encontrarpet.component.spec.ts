import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncontrarpetComponent } from './encontrarpet.component';

describe('EncontrarpetComponent', () => {
  let component: EncontrarpetComponent;
  let fixture: ComponentFixture<EncontrarpetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncontrarpetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncontrarpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
