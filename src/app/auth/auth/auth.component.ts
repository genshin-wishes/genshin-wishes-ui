import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { filter, tap } from 'rxjs/operators';
import { User } from '../../api/genshin-wishes/user';
import { combineLatest } from 'rxjs';
import { TopService } from '../../core/top.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loading = false;

  constructor(
    private _top: TopService,
    private _http: HttpClient,
    private _router: Router,
    private _auth: AuthService,
    private _route: ActivatedRoute
  ) {
    this._top.setTitle('app.signIn');
  }

  ngOnInit(): void {
    combineLatest([this._route.params, this._route.queryParams])
      .pipe(
        filter(([p]) => p.registrationId),
        tap(() => (this.loading = true))
      )
      .subscribe(([p, q]) => {
        if (!!q.error) {
          this._router.navigate(['/login']);
          return;
        }

        this._http
          .get<User>(`/api/login/oauth2/code/${p.registrationId}`, {
            params: this._route.snapshot.queryParams,
          })
          .toPromise()
          .then(async () => {
            const user = await this._auth.getUser().toPromise();

            if (!!user.mihoyoUid) this._router.navigate(['/banners']);
            else this._router.navigate(['/logout']);
          })
          .catch(() => this._router.navigate(['/login']));
      });
  }
}
