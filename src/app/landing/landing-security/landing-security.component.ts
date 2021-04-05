import { Component, OnInit } from '@angular/core';
import * as Flickity from 'flickity';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-security',
  templateUrl: './landing-security.component.html',
  styleUrls: ['./landing-security.component.scss'],
})
export class LandingSecurityComponent implements OnInit {
  discordUrl = environment.discord;

  constructor() {}

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    new Flickity('.security-slider', {
      prevNextButtons: false,
      percentPosition: false,
      groupCells: true,
      draggable: true,
    });
  }
}
