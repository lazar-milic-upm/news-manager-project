import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';


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

    constructor(private router: Router, public loginService: LoginService) {}

    login() {
        this.loginService.login(this.username, this.password).subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: () => {
                this.errorMessage = 'Login failed. Please try again.';
            }
        });
    }

    skipLogin() {
        this.router.navigate(['/home']);
    }
}