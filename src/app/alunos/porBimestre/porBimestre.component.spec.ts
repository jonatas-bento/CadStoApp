/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PorBimestreComponent } from './porBimestre.component';

describe('PorBimestreComponent', () => {
  let component: PorBimestreComponent;
  let fixture: ComponentFixture<PorBimestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorBimestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorBimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
