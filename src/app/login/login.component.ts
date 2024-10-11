import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  currentUser: User | null = null;

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.router.navigate(['/home']); // Navigate to home upon successful login
    } else {
      this.errorMessage = 'Please enter a username and password';
    }
  }

  skipLogin() {
    this.router.navigate(['/home']);
  }
}