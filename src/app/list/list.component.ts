import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalInfoComponent } from '../edit-modal-info/edit-modal-info.component';
import Swal from 'sweetalert2';
import { UserService } from '../service/user/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EditModalInfoComponent,
    HttpClientModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [UserService],
})
export class ListComponent {
  registrations: any[] = [];
  showModal: boolean = false;
  editedRegister: any = {};
  isSmallScreen: boolean = false;

  constructor(private user_service: UserService) {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    const localRegistrations = JSON.parse(
      localStorage.getItem('register') || '[]'
    );

    this.user_service.getUsers().subscribe((data) => {
      const apiDataWithActions = data.map((item: any) => ({
        ...item,
        acoes: 'N',
      }));

      const localDataWithActions = localRegistrations.map((item: any) => ({
        ...item,
        acoes: 'S',
      }));

      this.registrations = [...apiDataWithActions, ...localDataWithActions];
    });
  }

  onEdit(index: number): void {
    this.editedRegister = { ...this.registrations[index] };
    this.showModal = true;
  }

  onDelete(index: number): void {
    Swal.fire({
      title: 'Excluir registro?',
      text: 'Deseja excluir esta informação permanentemente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.registrations.splice(index, 1);
        localStorage.setItem('register', JSON.stringify(this.registrations));
        Swal.fire('Excluído!', 'Informação excluída com sucesso.', 'success');
      }
    });
  }

  formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, ''); 
    
    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (digits.length === 10) {
   
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return phone;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  onSave(updatedRegister: any) {
    const index = this.registrations.findIndex(
      (reg) => reg.cpf === updatedRegister.cpf
    );
    if (index !== -1) {
      this.registrations[index] = updatedRegister;
      localStorage.setItem('register', JSON.stringify(this.registrations));

      Swal.fire({
        icon: 'success',
        title: 'Informação atualizada',
        text: 'Registro atualizado com sucesso!',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }
}
