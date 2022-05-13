import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../VideoDto';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  videos: Array<VideoDto> = [];
  userId!: string | null;

  constructor(private route:ActivatedRoute,private videoService: VideoService) {
    this.userId = this.route.snapshot.params['userId'];
    if (this.userId == null) {
      this.userId = localStorage.getItem('userId');
    }
  }

  ngOnInit(): void {
    if (this.userId != null) {
      this.videoService.getVideosByChannel(this.userId).subscribe(data => {
        this.videos = data;
      })
    }
  }

}
