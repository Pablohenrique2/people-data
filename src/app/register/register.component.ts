import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  register = {
    name: '',
    cpf: '',
    phone: '',
    email: '',
  };

  isLoading = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.isLoading = true;

    setTimeout(() => {
      const dados = JSON.parse(localStorage.getItem('register') || '[]');
      dados.push(this.register);
      localStorage.setItem('register', JSON.stringify(dados));

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

  isCpfIncomplete(): boolean {
    if (!this.register?.cpf) return false;
    const digitsOnly = this.register.cpf.replace(/\D/g, '');
    return digitsOnly.length < 11;
  }

  isPhoneIncomplete(): boolean {
    if (!this.register?.phone) return false;
    const digitsOnly = this.register.phone.replace(/\D/g, '');
    return digitsOnly.length < 11; 
  }

  resetForm() {
    this.register = {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    };

    const form = document.querySelector('form');
    if (form) {
      form.reset();
    }
  }
}
