import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../VideoDto';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnDestroy {

  videos: Array<VideoDto> = [];
  

  constructor(private videoService: VideoService, private authservice: AuthService, private userService: UserService) {
    
  }

  ngOnDestroy(): void {
  }
}

