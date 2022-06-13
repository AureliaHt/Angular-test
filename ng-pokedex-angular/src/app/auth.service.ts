import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;

  login(name: string, password: string): Observable<boolean> {
    // name / password = simulation
    const isLoggedIn = (name == 'pikachu' && password == 'pikachu');
    // delay = simulation d'un temps de chargement
    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
