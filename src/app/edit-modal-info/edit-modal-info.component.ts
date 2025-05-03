import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-edit-modal-info',
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskDirective
  ],
  templateUrl: './edit-modal-info.component.html',
  styleUrl: './edit-modal-info.component.css'
})
export class EditModalInfoComponent {
  @Input() showModal: boolean = false;
  @Input() editedRegister: any = {};
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  isLoading = false;


  
  isCpfIncomplete(): boolean {
    if (!this.editedRegister?.cpf) return false;
    const digitsOnly = this.editedRegister.cpf.replace(/\D/g, '');
    return digitsOnly.length < 11;
  }

  isPhoneIncomplete(): boolean {
    if (!this.editedRegister?.phone) return false;
    const digitsOnly = this.editedRegister.phone.replace(/\D/g, '');
    return digitsOnly.length < 11; 
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      this.save.emit(this.editedRegister);
      this.closeModal();
      this.isLoading = false;
    }, 1500);
  }
}
