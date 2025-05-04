import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonalFormComponent } from '../components/personal-form/personal-form.component';
import { User } from '../models/user.model';
import { LocalUserService } from '../service/local-storage/local-user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonalFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('formRef') formRef!: NgForm;

  register: User = {
    name: '',
    cpf: '',
    phone: '',
    email: '',
  };

  isLoading = false;

  constructor(
    private router: Router,
    private localUserService: LocalUserService
  ) {}

  onSubmit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.localUserService.saveUser(this.register);

      Swal.fire({
        title: 'Sucesso!',
        text: 'Registro salvo com sucesso. Você deseja ir para a lista ou continuar na página?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Ir para a lista',
        cancelButtonText: 'Continuar na página',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/list']);
        } else {
          this.resetForm();
        }
      });

      this.isLoading = false;
    }, 1500);
  }

  resetForm(): void {
    this.register = {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    };

    if (this.formRef) {
      this.formRef.resetForm();
    }
  }
}
