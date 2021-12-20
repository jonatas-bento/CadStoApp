/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotasServiceService } from './notasService.service';

describe('Service: NotasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotasServiceService]
    });
  });

  it('should ...', inject([NotasServiceService], (service: NotasServiceService) => {
    expect(service).toBeTruthy();
  }));
});
