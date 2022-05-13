import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.css']
})
export class VideoDescriptionComponent implements OnInit {

  @Input()
  videoDescription!:string;
  @Input()
  tags!:Array<string>;
  constructor() { }

  ngOnInit(): void {
  }

}
