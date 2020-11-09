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
    persist: true,
    valid: false,
  };
  positiveFeedback = false;

  ngOnInit(): void {
    this.urlData = this.urlDataIn || this.urlData;
  }

  assertUrl(mihoyoUrl: string): void {
    if (!mihoyoUrl) {
      this.feedback = '';
      this.positiveFeedback = false;
    }

    if (
      !mihoyoUrl.startsWith(
        'https://webstatic-sea.mihoyo.com/ys/event/im-service/index.html'
      )
    ) {
      this.feedback = 'app.urlInput.incorrectLink';
      this.positiveFeedback = false;
    } else {
      this.feedback = 'app.urlInput.correctLink';
      this.positiveFeedback = true;
    }
  }
}
