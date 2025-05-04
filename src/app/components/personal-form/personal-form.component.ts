import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { PersonalFormModel } from '../../models/personal-form.model';


@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css'],
})
export class PersonalFormComponent {
  @Input() model: PersonalFormModel = {} as PersonalFormModel;
  @Input() isLoading: boolean = false;
  @Input() submitText: string = 'Salvar';

  @Output() formSubmit = new EventEmitter<void>();

  isCpfIncomplete(): boolean {
    if (!this.model?.cpf) return false;
    const digitsOnly = this.model.cpf.replace(/\D/g, '');
    return digitsOnly.length < 11;
  }

  isPhoneIncomplete(): boolean {
    if (!this.model?.phone) return false;
    const digitsOnly = this.model.phone.replace(/\D/g, '');
    return digitsOnly.length < 11;
  }

  onSubmit(): void {
    this.formSubmit.emit();
  }
}
