import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importando RouterModule e Routes

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UserService } from './service/user/user.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' } // Rota padrão
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configurando as rotas
    AppComponent,
    RegisterComponent,
    ListComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [  provideNgxMask(), UserService],
})
export class AppModule { }
