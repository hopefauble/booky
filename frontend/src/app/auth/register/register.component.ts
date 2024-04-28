import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = '';

  RegisterForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.RegisterForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const { username, password } = this.RegisterForm.value;
    this.authService.registerUser({ username, password }).subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }
}
