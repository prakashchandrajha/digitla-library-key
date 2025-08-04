import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoading = false;

  // Generate a random string for PKCE
  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Generate SHA256 hash and base64url encode
  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  async onLogin(): Promise<void> {
    this.isLoading = true;
    console.log('Login clicked - will redirect to Keycloak');
    
    try {
      // Generate PKCE parameters
      const codeVerifier = this.generateRandomString(43);
      const codeChallenge = await this.generateCodeChallenge(codeVerifier);
      
      console.log('Code verifier:', codeVerifier);
      console.log('Code challenge:', codeChallenge);
      
      // Store code verifier for later use
      sessionStorage.setItem('code_verifier', codeVerifier);
      
      // Redirect to Keycloak with PKCE parameters
      const authUrl = `http://localhost:8180/realms/digital-library/protocol/openid-connect/auth?client_id=digital-library-frontend&redirect_uri=http://localhost:4200/callback&response_type=code&scope=openid&code_challenge_method=S256&code_challenge=${codeChallenge}`;
      
      console.log('Auth URL:', authUrl);
      console.log('About to redirect to Keycloak...');
      
      // Add a small delay to see the console messages
      setTimeout(() => {
        window.location.href = authUrl;
      }, 1000);
      
    } catch (error) {
      console.error('Error generating PKCE parameters:', error);
      this.isLoading = false;
    }
  }

  async onRegister(): Promise<void> {
    this.isLoading = true;
    console.log('Register clicked - will redirect to Keycloak');
    
    try {
      // Generate PKCE parameters
      const codeVerifier = this.generateRandomString(43);
      const codeChallenge = await this.generateCodeChallenge(codeVerifier);
      
      console.log('Code verifier:', codeVerifier);
      console.log('Code challenge:', codeChallenge);
      
      // Store code verifier for later use
      sessionStorage.setItem('code_verifier', codeVerifier);
      
      // Redirect to Keycloak registration with PKCE parameters
      const registerUrl = `http://localhost:8180/realms/digital-library/protocol/openid-connect/registrations?client_id=digital-library-frontend&redirect_uri=http://localhost:4200/callback&response_type=code&scope=openid&code_challenge_method=S256&code_challenge=${codeChallenge}`;
      
      console.log('Register URL:', registerUrl);
      window.location.href = registerUrl;
    } catch (error) {
      console.error('Error generating PKCE parameters:', error);
      this.isLoading = false;
    }
  }
} 