import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface AuthUrlAndPersistInfo {
  authUrl: string;
  persist: boolean;
  valid: boolean;
}

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.scss'],
})
export class UrlInputComponent implements OnInit {
  @Input('urlData')
  urlDataIn!: AuthUrlAndPersistInfo;
  @Output()
  urlDataChange = new EventEmitter<AuthUrlAndPersistInfo>();

  @Input()
  feedback = '';

  urlData: AuthUrlAndPersistInfo = {
    authUrl: '',
    persist: false,
    valid: false,
  };
  positiveFeedback = 'app.urlInput.correctLink';

  ngOnInit(): void {
    this.urlData = this.urlDataIn || this.urlData;
  }

  assertUrl(mihoyoUrl: string): void {
    if (!mihoyoUrl) {
      this.feedback = '';
    }

    if (!mihoyoUrl.includes('authkey=') || mihoyoUrl === 'authkey=') {
      this.feedback = 'app.urlInput.incorrectLink';
    } else {
      this.feedback = this.positiveFeedback;
    }
  }
}
