import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importando o RouterModule

@Component({
  selector: 'app-root',
  standalone: true,  // Garantindo que o componente seja standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]  // Importando o RouterModule aqui
})
export class AppComponent {
  title = 'PeopleData';
}
