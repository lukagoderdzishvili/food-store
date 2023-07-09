import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY: string = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  public login(userLogin: IUserLogin): Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocaclStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to FoodMine ${user.name}`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    )
  }

  public logout(): void{
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocaclStorage(user: User): void{
    console.log(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
