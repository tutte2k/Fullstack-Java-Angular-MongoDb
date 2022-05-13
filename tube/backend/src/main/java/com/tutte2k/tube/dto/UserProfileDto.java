package com.tutte2k.tube.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDto {
    String fullName;
    String pictureUrl;
    Set<String> subscribers;
    Set<String> subscriptions;
    Set<String> likedVideos;
    Set<String> dislikedVideos;
    Set<String> videoHistory;
}
