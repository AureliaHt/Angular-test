import { Component } from '@angular/core';

// Composant qui doit contenir au minimum deux composants => 
// selector donnant un nom au composant
@Component({ 
  selector: 'app-root',
  template: `<h1>Welcome to {{title}}!</h1>`
})
export class AppComponent {
  title = 'ng-pokedex-angular';
}
