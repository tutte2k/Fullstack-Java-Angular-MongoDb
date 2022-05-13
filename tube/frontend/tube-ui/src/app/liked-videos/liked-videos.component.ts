import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../VideoDto';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent implements OnDestroy {

  videos: Array<VideoDto> = [];
  

  constructor(private videoService: VideoService, private authservice: AuthService, private userService: UserService) {
    
  }

  ngOnDestroy(): void {
  }

}

