import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { PetService } from './pet.service';
import { ApiService } from './api.service';

describe('Service: PetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
