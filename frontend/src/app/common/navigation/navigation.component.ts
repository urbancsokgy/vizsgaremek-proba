import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  readonly user$ = this.auth.currentUser$;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.auth.logout();
  }

}
