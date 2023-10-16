import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesListComponent } from './policies-list.component';

describe('PoliciesListComponent', () => {
  let component: PoliciesListComponent;
  let fixture: ComponentFixture<PoliciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
