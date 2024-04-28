import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string ='';

  LoginForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.LoginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit() {

  }

  onSubmit() {
    const { username, password } = this.LoginForm.value;
    this.authService.loginUser({ username, password }).subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }

}
