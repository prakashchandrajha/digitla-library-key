import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoading = false;

  onLogout(): void {
    this.isLoading = true;
    console.log('Logout clicked - will redirect to Keycloak logout');
    // Simulate logout redirect
    setTimeout(() => {
      window.location.href = 'http://localhost:8180/realms/digital-library/protocol/openid-connect/logout?client_id=digital-library-frontend&post_logout_redirect_uri=http://localhost:4200/auth';
    }, 1000);
  }
} 