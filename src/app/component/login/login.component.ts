import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private readonly fb = inject(FormBuilder);

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control<string>('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])),
      password: this.fb.control<string>('', Validators.required)
    })  
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
  
  handleLogin() {
    
  }
}
