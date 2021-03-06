import { Router } from '@angular/router';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private token = localStorage.getItem('x-key-x-u-log');
  private origin = '';
  private currentUser: any = null;
  constructor(@Inject(DOCUMENT) private document: Document,private router: Router) {
    this.origin = this.document.location.origin;
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    };
    return httpOptions;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserId(){
    return this.currentUser.id;
  }

  setCurrentUser(user){
    this.currentUser = user;
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getApikey() {
    let user = JSON.parse(localStorage.getItem('x-key-x-u-log'));
    return user.api ? user.api : '';
  }

  getHttpOptionsNotToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  host() {
    return this.origin;
  }

  host1() {
    return 'http://localhost:3000/';
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error('An error occurred:', error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
