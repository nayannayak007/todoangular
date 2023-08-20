import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: any, password: any) {
    const url = `/registration/login`;
    const data = { username, password };

    return this.http.post(url, data);
  }

  register(email:any,username: any, password: any) {
    const url = `/registration/register`;
    const data = { username, password, email };

    return this.http.post(url,  data);
  }
}
