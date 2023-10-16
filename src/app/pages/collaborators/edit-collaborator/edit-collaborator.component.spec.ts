import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollaboratorComponent } from './edit-collaborator.component';

describe('EditCollaboratorComponent', () => {
  let component: EditCollaboratorComponent;
  let fixture: ComponentFixture<EditCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCollaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
