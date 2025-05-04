import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class LocalUserService {
  private readonly key = 'register';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.key, JSON.stringify(users));
  }
}
