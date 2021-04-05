import { Component, OnInit } from '@angular/core';

import { get } from 'scriptjs';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss'],
})
export class LandingFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    get('https://platform.twitter.com/widgets.js', () => {});
    get('https://buttons.github.io/buttons.js', () => {});
  }
}
