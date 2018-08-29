import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { ListService } from '../services/list.service';
import { UserModel } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  username: string;
  password: string;

  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(["user"]);
    } else {
      alert("Неверный логин/пароль");
    }
  }

  ngOnInit() {
  }

}
