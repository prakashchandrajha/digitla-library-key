import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfileSubject = new BehaviorSubject<KeycloakProfile | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor(private keycloakService: KeycloakService) {
    this.initializeUserProfile();
  }

  private async initializeUserProfile(): Promise<void> {
    if (await this.keycloakService.isLoggedIn()) {
      try {
        const profile = await this.keycloakService.loadUserProfile();
        this.userProfileSubject.next(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  }

  public async login(): Promise<void> {
    try {
      await this.keycloakService.login();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async register(): Promise<void> {
    try {
      await this.keycloakService.register();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.keycloakService.logout();
      this.userProfileSubject.next(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  public async isLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  public getUserProfile(): Observable<KeycloakProfile | null> {
    return this.userProfile$;
  }

  public getUsername(): string | undefined {
    return this.keycloakService.getUsername();
  }

  public async getToken(): Promise<string | undefined> {
    try {
      return await this.keycloakService.getToken();
    } catch (error) {
      console.error('Error getting token:', error);
      return undefined;
    }
  }

  public async updateToken(minValidity: number = 5): Promise<boolean> {
    return await this.keycloakService.updateToken(minValidity);
  }
} 