import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoarpetComponent } from './doarpet.component';

describe('DoarpetComponent', () => {
  let component: DoarpetComponent;
  let fixture: ComponentFixture<DoarpetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoarpetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoarpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
