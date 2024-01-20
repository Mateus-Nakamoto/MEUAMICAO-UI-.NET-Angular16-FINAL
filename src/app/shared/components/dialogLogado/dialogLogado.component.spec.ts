import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLogadoComponent } from './dialogLogado.component';

describe('DialogLogadoComponent', () => {
  let component: DialogLogadoComponent;
  let fixture: ComponentFixture<DialogLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLogadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
