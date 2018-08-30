import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserModel, StuffModel} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:3000/';

  constructor(private http: Http) {

  }

  checkUser(user: UserModel) {
    return this.http.get(this.apiUrl + 'login', user).toPromise();
  }

  createUser(user: UserModel) {
    return this.http.post(this.apiUrl + user.username, '/').toPromise();
  }

  editUser(id: string, user: UserModel) {
    return this.http.put(this.apiUrl + 'upd', user).toPromise();  //пока нет рабочей версии put запроса на сервере
  }

}

