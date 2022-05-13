import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Subscription } from "rxjs";
import { CommentService } from '../services/comments.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnDestroy, OnInit {
  @Input()
  videoId!: string;
  showCommentSection: boolean = false;

  commentsForm: FormGroup;
  comments: Array<any> = [];
  commentsSubscription: Subscription = new Subscription;
  postCommentSubscription: Subscription = new Subscription;

  userId!: string | null;
  author!:string;
  commentAuthorPic!:string;

  constructor(private commentService: CommentService, private matSnackBar: MatSnackBar, private userService: UserService) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment'),
    });
    this.commentsSubscription = this.getCommentsSubscription();
    this.userId = localStorage.getItem('userId')
  }
  ngOnInit(): void {
    this.commentsSubscription = this.getCommentsSubscription();
    this.commentsForm.get('comment')?.reset();
    if (this.userId != null) {
      this.userService.getUserProfile(this.userId).subscribe(data => {
        this.author = data.fullName;
        this.commentAuthorPic = data.pictureUrl;
      })
    }

  }

  private getCommentsSubscription() {
    return this.commentService.getComments(this.videoId).subscribe(response => {
      this.comments = response.reverse();
    });
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
    this.postCommentSubscription.unsubscribe();
  }

  showCommentButton() {
    this.showCommentSection = true;
  }

  postComment() {
    const commentText: string = this.commentsForm.get('comment')?.value;
    const commentDto = {
      "commentText": commentText,
      "commentAuthor": this.author,
      "commentAuthorPic": this.commentAuthorPic,
      "date": '',
      "likeCount": 0,
      "disLikeCount": 0
    }
    this.postCommentSubscription = this.commentService.postComment(commentDto, this.videoId)
      .subscribe(() => {
        this.matSnackBar.open("Comment Added Successfully", "OK");
        this.showCommentSection = false;

        this.commentsForm.get('comment')?.reset();
        this.commentsSubscription = this.getCommentsSubscription();
      });
  }
}
