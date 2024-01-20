import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoarpetCEPComponent } from './doarpetCEP.component';

describe('DoarpetCEPComponent', () => {
  let component: DoarpetCEPComponent;
  let fixture: ComponentFixture<DoarpetCEPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoarpetCEPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoarpetCEPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
