export interface UserDto{
    fullName: string;
    pictureUrl: string;
    subscribers: Set<string>;
    subscriptions: Set<string>;
    likedVideos: Set<string>;
    dislikedVideos: Set<string>;
    videoHistory: Set<string>;
}