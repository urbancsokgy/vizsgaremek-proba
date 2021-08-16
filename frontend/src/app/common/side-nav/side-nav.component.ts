import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  readonly user$ = this.auth.currentUser$;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
