import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpData } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

type FormControls = { [key: string]: AbstractControl };

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private readonly defaultCountry = 'Magyarország';

  readonly signUpForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(4) ]),
    confirmPassword: new FormControl('', Validators.required),
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
    address: new FormGroup({
      country: new FormControl(this.defaultCountry, [ Validators.required ]),
      city: new FormControl('', [ Validators.required, Validators.pattern("^[A-ZÖÜÓŐÚŰÁÉ][a-zöüóőúáű]+$") ]),
      zip: new FormControl(null, [ Validators.required, Validators.pattern("^[0-9]{4}$") ]),
      street: new FormControl('', [ Validators.required, Validators.pattern("^[A-ZÖÜÓŐÚŰÁÉ].*") ]),
      building: new FormControl(null, [ Validators.required, Validators.pattern("^[0-9]+$") ]),
    })
  }, (form) => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    }

    return null;
  });

  private _error: string|null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  get f(): FormControls {
    return this.signUpForm.controls;
  }

  get addressGroup(): FormControls {
    return (this.f.address as FormGroup).controls;
  }

  get error(): string|null {
    return this._error;
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this._error = null;

    const data: SignUpData = {
      ...this.signUpForm.value
    };
    data.address.country = this.defaultCountry;

    this.userService.signUp(data).toPromise()
      .then(() => this.router.navigate(['/login']))
      .catch(() => 'Failed to sign up');
  }
}
