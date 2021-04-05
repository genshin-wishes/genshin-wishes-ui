import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-landing-comments',
  templateUrl: './landing-comments.component.html',
  styleUrls: ['./landing-comments.component.scss'],
})
export class LandingCommentsComponent {
  comments: {
    comment: string;
    username: string;
    link: string;
  }[] = [
    {
      comment:
        "I've been using a spreadsheet someone made where you can pretty easily copy/paste, but this may be even simpler.",
      username: 'u/Cunningcory',
      link:
        'https://www.reddit.com/r/GenshinImpactTips/comments/lx0vq2/i_made_a_website_to_backup_your_wish_history/gpmedw4/',
    },
    {
      comment: 'You’re the hero we needed but did not deserve.',
      username: 'u/AmBlackout',
      link:
        'https://www.reddit.com/r/GenshinImpactTips/comments/lx0vq2/i_made_a_website_to_backup_your_wish_history/gpkd1hd/',
    },
    {
      comment: 'Doing god’s work dudes.',
      username: 'u/sa1thy',
      link:
        'https://www.reddit.com/r/GenshinImpactTips/comments/lx0vq2/i_made_a_website_to_backup_your_wish_history/gpllqj2/',
    },
    {
      comment:
        'Thank you so much for this! Trying to calculate pities and such is such a pain.',
      username: 'u/TheresNoThe_Sis',
      link:
        'https://www.reddit.com/r/Genshin_Impact/comments/lyfrj2/i_made_a_website_to_backup_your_wish_history/gpsg9jf/',
    },
    {
      comment: 'You are a god send I lost track of my pity for Venti.',
      username: 'u/Thumpkin2',
      link:
        'https://www.reddit.com/r/Genshin_Impact/comments/lyfrj2/i_made_a_website_to_backup_your_wish_history/gpstc3k/',
    },
    {
      comment: 'Been using it for a few months and I recommend it!',
      username: 'u/Tchainese',
      link:
        'https://www.reddit.com/r/GenshinImpactTips/comments/lx0vq2/i_made_a_website_to_backup_your_wish_history/gpkcnxd/',
    },
  ];

  page = 0;
  readonly numberPerPage$ = this._media.asObservable().pipe(
    map(() => (this._media.isActive('gt-xs') ? 6 : 2)),
    tap(() => (this.page = 0))
  );

  constructor(private _media: MediaObserver) {}
}
