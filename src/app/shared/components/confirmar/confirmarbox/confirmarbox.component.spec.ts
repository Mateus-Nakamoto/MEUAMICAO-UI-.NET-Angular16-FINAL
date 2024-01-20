import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarboxComponent } from './confirmarbox.component';

describe('ConfirmarboxComponent', () => {
  let component: ConfirmarboxComponent;
  let fixture: ComponentFixture<ConfirmarboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
