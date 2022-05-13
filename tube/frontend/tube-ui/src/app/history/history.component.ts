import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../VideoDto';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnDestroy,OnInit {
  videos: Array<VideoDto> = [];
  videoIds!: Set<string>;
  userId!:string|null;


  constructor(private videoService: VideoService, private authservice: AuthService, private userService: UserService) {
    this.userId=localStorage.getItem('userId');
    
  }
  ngOnInit(): void {
    /*
    if(this.userId!=null){
      this.userService.getUserHistory(this.userId).subscribe(data=>{
        this.videoIds = data;
      });
      this.videoIds.forEach(element => {
        this.videos.
      });
    }*/
    
  }

  ngOnDestroy(): void {
  }

}
