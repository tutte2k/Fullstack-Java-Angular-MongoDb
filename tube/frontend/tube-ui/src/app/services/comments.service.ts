import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../comments/comment'


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }
  postComment(commentDto: any, videoId: string): Observable<any> {
    return this.httpClient.post("http://localhost:8081/api/video/" + videoId + "/comment", commentDto,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
  }

  getComments(videoId: string): Observable<Array<Comment>> {
    return this.httpClient.get<Comment[]>("http://localhost:8081/api/video/" + videoId + "/comment",
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
  }
}
