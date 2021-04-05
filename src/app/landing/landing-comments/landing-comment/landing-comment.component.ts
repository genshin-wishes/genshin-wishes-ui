import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-comment',
  templateUrl: './landing-comment.component.html',
  styleUrls: ['./landing-comment.component.scss'],
})
export class LandingCommentComponent {
  @Input()
  comment!: string;
  @Input()
  username!: string;
  @Input()
  link!: string;
}
