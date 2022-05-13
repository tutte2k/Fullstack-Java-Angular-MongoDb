import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { CommentsComponent } from './comments/comments.component';
import { FeaturedComponent } from './featured/featured.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LikedVideosComponent } from './liked-videos/liked-videos.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SuggestionBarComponent } from './suggestion-bar/suggestion-bar.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatOptionModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { NgxFileDropModule } from "ngx-file-drop";
import { CallbackComponent } from './callback/callback.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { AuthService } from "./services/auth.service";
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { VideoDescriptionComponent } from './video-description/video-description.component';
import { VideoTagListComponent } from './video-tag-list/video-tag-list.component';
import {MatMenuModule} from '@angular/material/menu';
import { ChannelComponent } from './channel/channel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    VideoPlayerComponent,
    VideoDetailComponent,
    CommentsComponent,
    SidebarComponent,
    SuggestionBarComponent,
    AuthComponent,
    SubscriptionsComponent,
    LikedVideosComponent,
    HistoryComponent,
    FeaturedComponent,
    VideoCardComponent,
    VideoDescriptionComponent,
    VideoTagListComponent,
    CallbackComponent,
    UploadVideoComponent,
    SaveVideoDetailsComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    FlexModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatChipsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
