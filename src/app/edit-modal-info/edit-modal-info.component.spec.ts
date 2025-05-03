import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalInfoComponent } from './edit-modal-info.component';

describe('EditModalInfoComponent', () => {
  let component: EditModalInfoComponent;
  let fixture: ComponentFixture<EditModalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
