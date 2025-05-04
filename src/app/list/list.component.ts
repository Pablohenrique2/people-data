import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalInfoComponent } from '../edit-modal-info/edit-modal-info.component';
import Swal from 'sweetalert2';
import { UserService } from '../service/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Registration } from '../models/registration.model';
import { LocalRegistrationService } from '../service/local-storage/local-registration.service';

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
  styleUrls: ['./list.component.css'],
  providers: [UserService],
})
export class ListComponent {
  registrations: Registration[] = [];
  showModal: boolean = false;
  editedRegister: Registration = {} as Registration;
  isSmallScreen: boolean = false;

  constructor(
    private user_service: UserService,
    private localRegistrationService: LocalRegistrationService
  ) {
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
    const localRegistrations = this.localRegistrationService.getRegistrations();
  
    this.user_service.getUsers().subscribe((data) => {
      const apiDataWithActions = data.map((item: any) => ({
        ...item,
        acoes: 'N',
      }));

      const apiCpfs = new Set(apiDataWithActions.map((item: any) => item.cpf));

      const localDataWithActions = localRegistrations
        .filter((item: any) => !apiCpfs.has(item.cpf))
        .map((item: any) => ({
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
    const registrationToDelete = this.registrations[index];
    Swal.fire({
      title: 'Excluir registro?',
      text: 'Deseja excluir esta informação permanentemente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.localRegistrationService.deleteRegistration(registrationToDelete.cpf);
        this.registrations.splice(index, 1);
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

  onSave(updatedRegister: Registration) {
    this.localRegistrationService.updateRegistration(updatedRegister);
    const index = this.registrations.findIndex(
      (reg) => reg.cpf === updatedRegister.cpf
    );
    if (index !== -1) {
      this.registrations[index] = updatedRegister;
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
