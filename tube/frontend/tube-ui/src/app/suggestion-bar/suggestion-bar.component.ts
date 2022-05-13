import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../VideoDto';

@Component({
  selector: 'app-suggestion-bar',
  templateUrl: './suggestion-bar.component.html',
  styleUrls: ['./suggestion-bar.component.css']
})
export class SuggestionBarComponent implements OnInit {


  suggestedVideos: Array<VideoDto> = [];
  getSuggestedVideosSubscription!: Subscription;
  userId!: string | null;


  constructor(private videoService: VideoService) {
    this.userId = localStorage.getItem('userId')
  }
  ngOnInit(): void {
    if (this.userId != null) {
      this.getSuggestedVideosSubscription = this.videoService.getSuggestedVideos(this.userId).subscribe(data => {
        this.suggestedVideos = data;
      });
    }
  }
 

}
