import {Component, OnInit} from '@angular/core';
import {EmployeeModel} from '../models/employee.model';
import {UserModel} from "../models/user.model";
import {AuthService} from "../api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: UserModel = {};

  constructor(private authService: AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.isUserAuth();
  }

  login(): void {
    this.authService.login(this.user).subscribe(
      data => {
        localStorage.setItem('user',data.id);
        this.router.navigate(['salaryrules']);
      }
    )
    }

    isUserAuth(): void {
      if (localStorage.getItem('user') !== '' || localStorage.getItem('user') !== null) this.router.navigate(['/products/CPU'])
    }

  }