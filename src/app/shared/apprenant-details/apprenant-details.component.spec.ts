import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantDetailsComponent } from './apprenant-details.component';

describe('ApprenantDetailsComponent', () => {
  let component: ApprenantDetailsComponent;
  let fixture: ComponentFixture<ApprenantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprenantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
