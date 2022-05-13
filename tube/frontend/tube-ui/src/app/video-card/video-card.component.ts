import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { VideoDto } from '../VideoDto';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {


  @Input()
  video!: VideoDto;

  videoOwnerId!: string | '';
  videoOwnerName!: string | '';
  videoOwnerPicUrl!: string | '';

  constructor(private userService:UserService) { 

  }

  ngOnInit(): void {
    this.userService.getUserProfile(this.video.userId).subscribe(data => {
      this.videoOwnerName = data.fullName;
      this.videoOwnerPicUrl = data.pictureUrl;
    })
  }


}
