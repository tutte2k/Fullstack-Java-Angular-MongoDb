import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tag-list',
  templateUrl: './video-tag-list.component.html',
  styleUrls: ['./video-tag-list.component.css']
})
export class VideoTagListComponent implements OnInit {

  @Input()
  tags!:Array<string>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
