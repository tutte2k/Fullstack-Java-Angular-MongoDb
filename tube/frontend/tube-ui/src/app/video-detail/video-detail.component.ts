import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { VideoService } from '../services/video.service';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';



@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnDestroy, OnInit {
  subscribeToUserObservable: Subscription = new Subscription;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;
  videoUrl!: string;
  videoUrlAvailable = false;

  videoId!: string | '';
  videoName!: string | '';
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;
  date!: string | '';
  videoDescription!: string | '';
  tags!: Array<string>;

  videoOwnerId!: string | '';
  videoOwnerName!: string | '';
  videoOwnerPicUrl!: string | '';
  videoOwnerSubscibersCount: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService,
    private videoService: VideoService) {
    this.videoId = this.route.snapshot.params['videoId'];
  }

  ngOnInit(): void {
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoOwnerId = data.userId;
      this.videoUrl = data.url;
      this.videoUrlAvailable = true;
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
      this.viewCount = data.viewCount;
      this.videoName = data.videoName;
      this.date = data.date;
      this.videoDescription = data.description;
      this.tags = data.tags;


      this.userService.getUserProfile(this.videoOwnerId).subscribe(data => {
        this.videoOwnerName = data.fullName;
        this.videoOwnerPicUrl = data.pictureUrl;
        this.videoOwnerSubscibersCount = Array.from(data.subscribers).length;
      })
    })
  }


  subscribeToUser() {
    this.subscribeToUserObservable = this.userService.subscribeToUser(this.videoOwnerId)
      .subscribe(() => {
        this.showSubscribeButton = false;
        this.showUnSubscribeButton = true;
      })
  }

  ngOnDestroy(): void {
    this.subscribeToUserObservable.unsubscribe();
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(data => {
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    })
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(data => {
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    })
  }
  reload() {
    if (this.videoId != this.route.snapshot.params['videoId']) {
      location.reload();
    }
  }
}
