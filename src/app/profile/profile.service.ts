import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../shared/lang.service';
import { AuthService } from '../auth/auth.service';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private _http: HttpClient,
    private _lang: LangService,
    private _gw: GenshinWishesService,
    private _auth: AuthService
  ) {}

  updateSharing(share: boolean): Promise<string> {
    return (share
      ? this._http.patch(`/api/user/share`, null, { responseType: 'text' })
      : this._http.patch(`/api/user/stopSharing`, null, {
          responseType: 'text',
        })
    ).toPromise();
  }

  getUsername(profileId: string): Observable<string> {
    return this._http.get(`/api/profile/${profileId}/`, {
      responseType: 'text',
    });
  }

  getStatsEndpoint(profileId: string): string {
    return `/api/profile/${profileId}`;
  }
}
