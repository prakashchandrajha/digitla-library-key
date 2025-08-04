import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-card">
        <h2>🔄 Processing Authentication...</h2>
        <p>Please wait while we complete your login.</p>
        <div class="loading-spinner"></div>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    
    .callback-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
    
    .callback-card h2 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    .callback-card p {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.1rem;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class CallbackComponent implements OnInit {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  private handleCallback(): void {
    console.log('Callback component loaded');
    console.log('Current URL:', window.location.href);
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    const state = urlParams.get('state');

    console.log('URL Parameters:', {
      code: code ? 'present' : 'missing',
      error: error,
      errorDescription: errorDescription,
      state: state
    });

    if (error) {
      console.error('Authentication error:', error, errorDescription);
      alert(`Authentication failed: ${errorDescription || error}`);
      this.router.navigate(['/auth']);
      return;
    }

    if (code) {
      console.log('Authorization code received:', code);
      // Store the authorization code
      sessionStorage.setItem('auth_code', code);
      
      // For now, just redirect to home page
      // In a real implementation, you would exchange the code for tokens
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      console.error('No authorization code received');
      console.log('Full URL parameters:', Object.fromEntries(urlParams.entries()));
      
      // Check if we're just visiting the callback page directly
      if (window.location.search === '') {
        console.log('No parameters found, redirecting to auth');
        this.router.navigate(['/auth']);
      } else {
        alert('Authentication failed: No authorization code received');
        this.router.navigate(['/auth']);
      }
    }
  }
} 