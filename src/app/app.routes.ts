import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'list', component: ListComponent },
    { path: '', redirectTo: 'register', pathMatch: 'full' }
];
