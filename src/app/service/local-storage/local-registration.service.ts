import { Injectable } from '@angular/core';
import { Registration } from '../../models/registration.model';

@Injectable({ providedIn: 'root' })
export class LocalRegistrationService {

  private readonly key = 'register';

  getRegistrations(): Registration[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveRegistration(registration: Registration): void {
    const registrations = this.getRegistrations();
    registrations.push(registration);
    localStorage.setItem(this.key, JSON.stringify(registrations));
  }

  updateRegistration(updatedRegistration: Registration): void {
    const registrations = this.getRegistrations();
    const index = registrations.findIndex(reg => reg.cpf === updatedRegistration.cpf);
    if (index !== -1) {
      registrations[index] = updatedRegistration;
      localStorage.setItem(this.key, JSON.stringify(registrations));
    }
  }

  deleteRegistration(cpf: string): void {
    const registrations = this.getRegistrations();
    const updatedRegistrations = registrations.filter(reg => reg.cpf !== cpf);
    localStorage.setItem(this.key, JSON.stringify(updatedRegistrations));
  }
}
