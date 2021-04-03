import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { User } from '../api/genshin-wishes/user';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Lang } from '../shared/lang.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user$ = new ReplaySubject<User | null>(1);
  readonly user$ = this._user$.asObservable();

  private _currentUser: User | null = null;

  constructor(private _http: HttpClient) {
    this.getUser()
      .pipe(catchError(() => of(null)))
      .subscribe((user) => this.register(user));
  }

  public getUser(): Observable<User> {
    return this._http
      .get<User>('/api/user')
      .pipe(tap((user) => this.register(user)));
  }

  getCurrentUser(): User | null {
    return this._currentUser;
  }

  register(user: User | null): void {
    this._currentUser = user;
    this._user$.next(user);
  }

  logout(): void {
    this.register(null);
  }

  setLang(lang: Lang): User | null {
    if (this._currentUser) {
      this._currentUser = { ...this._currentUser, lang };
      this.register(this._currentUser);

      return this._currentUser;
    }

    return null;
  }

  setWholeClock(wholeClock: boolean): User | null {
    if (this._currentUser) {
      this._currentUser = { ...this._currentUser, wholeClock };
      this.register(this._currentUser);

      return this._currentUser;
    }

    return null;
  }
}
