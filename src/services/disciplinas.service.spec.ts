/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DisciplinasService } from './disciplinas.service';

describe('Service: Disciplinas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisciplinasService]
    });
  });

  it('should ...', inject([DisciplinasService], (service: DisciplinasService) => {
    expect(service).toBeTruthy();
  }));
});
