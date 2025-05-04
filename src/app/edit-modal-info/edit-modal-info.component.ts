import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalFormComponent } from '../components/personal-form/personal-form.component';
import { Registration } from '../models/registration.model';

@Component({
  selector: 'app-edit-modal-info',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonalFormComponent],
  templateUrl: './edit-modal-info.component.html',
  styleUrls: ['./edit-modal-info.component.css'],
})
export class EditModalInfoComponent {
  @Input() showModal: boolean = false;
  @Input() editedRegister: Registration = {} as Registration;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Registration>();
  isLoading: boolean = false;

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.save.emit(this.editedRegister);
      this.closeModal();
      this.isLoading = false;
    }, 1500);
  }
}
