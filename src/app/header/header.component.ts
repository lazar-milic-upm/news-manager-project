import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news-service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  username: string | null | undefined;

  constructor(private newsService: NewsService, private loginService: LoginService,private router: Router) {}

  ngOnInit(): void {
    if(this.isLoggedIn())
      this.username = this.loginService.getUser()?.username;

  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLogged();
  }


}
