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
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string | null = null;
    currentUser: User | null = null;

    constructor(private router: Router, public loginService: LoginService) {
        this.checkForSavedToken();
    }

    // Check if a saved token exists and auto-login
    private checkForSavedToken(): void {
        if (window.electronAPI) {
            window.electronAPI.getToken().then((token: string | null) => {
                if (token) {
                    console.log('Token found:', token);
                    // Automatically navigate to home if token is valid
                    this.router.navigate(['/home']);
                }
            });
        }
    }

    // Perform login
    login() {
        this.loginService.login(this.username, this.password).subscribe({
            next: (response: any) => {
                const token = response.token;
                if (token && window.electronAPI) {
                    window.electronAPI.saveToken(token); // Save the token
                }
                this.router.navigate(['/home']); // Navigate to home on success
            },
            error: () => {
                this.errorMessage = 'Login failed. Please try again.';
            },
        });
    }

    // Skip login and navigate to home
    skipLogin() {
        this.router.navigate(['/home']);
    }
}
