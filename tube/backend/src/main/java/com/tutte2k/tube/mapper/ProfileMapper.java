package com.tutte2k.tube.mapper;

import com.tutte2k.tube.dto.UserProfileDto;
import com.tutte2k.tube.model.User;
import org.springframework.stereotype.Service;


@Service
public class ProfileMapper {
        public UserProfileDto mapToDto(User user) {
            return UserProfileDto.builder()
                    .fullName(user.getFullName())
                    .pictureUrl(user.getPicture())
                    .subscribers(user.getSubscribers())
                    .subscriptions(user.getSubscribedToUsers())
                    .likedVideos(user.getLikedVideos())
                    .dislikedVideos(user.getDisLikedVideos())
                    .videoHistory(user.getVideoHistory())
                    .build();
        }
    }


