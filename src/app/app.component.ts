import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './authConfig';
import { ReplaySubject } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-portal';
  user$ = new ReplaySubject<any>(1);

  constructor(
    private readonly authService: OAuthService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.authService.configure(authCodeFlowConfig);
    try {
      await this.authService.loadDiscoveryDocumentAndTryLogin();
      const user = await this.authService.loadUserProfile() as {info: any};
      this.user$.next(user.info);
    } catch (error) {
      this.user$.next({});
    }
  }

  public doLogin() {
    this.authService.initCodeFlow();
    this.authService.setupAutomaticSilentRefresh();
  }

  public doLogout() {
    this.authService.logOut();
  }

}
