package com.tutte2k.tube.service;

import com.tutte2k.tube.dto.UserProfileDto;
import com.tutte2k.tube.dto.VideoDto;
import com.tutte2k.tube.exception.TubeException;
import com.tutte2k.tube.mapper.ProfileMapper;
import com.tutte2k.tube.model.User;
import com.tutte2k.tube.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfileMapper profileMapper;

    public void addVideo(VideoDto videoDto) {
        var currentUser = getCurrentUser();
        currentUser.addToVideoHistory(videoDto.getVideoId());
        userRepository.save(currentUser);
    }

    public Set<String> getHistory(String id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new TubeException("Cannot Find User with ID - " + id));
        return user.getVideoHistory();
    }

    public void addToLikedVideos(String videoId) {
        var user = getCurrentUser();
        user.addToLikedVideos(videoId);
        userRepository.save(user);
    }

    public void removeFromLikedVideos(String videoId) {
        var user = getCurrentUser();
        user.removeFromLikedVideos(videoId);
        userRepository.save(user);
    }

    public void addToDisLikedVideo(String videoId) {
        var user = getCurrentUser();
        user.addToDisLikedVideo(videoId);
        userRepository.save(user);
    }

    public void removeFromDisLikedVideo(String videoId) {
        var user = getCurrentUser();
        user.removeFromDisLikedVideo(videoId);
        userRepository.save(user);
    }

    public boolean ifLikedVideo(String videoId) {
        return getCurrentUser().getLikedVideos().stream().anyMatch(id -> id.equals(videoId));
    }

    public boolean ifDisLikedVideo(String videoId) {
        return getCurrentUser().getDisLikedVideos().stream().anyMatch(id -> id.equals(videoId));
    }

    private User getCurrentUser() {
        String sub = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getClaim("sub");
        return userRepository.findBySub(sub).orElseThrow(() -> new TubeException("Cannot find user with sub - " + sub));
    }

    public Set<String> getLikedVideos(String userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new TubeException("Invalid user - " + userId));
        return user.getLikedVideos();
    }

    public void subscribeUser(String userId) {
        var currentUser = getCurrentUser();
        currentUser.addToSubscribedUsers(userId);
        var subscribedToUser = userRepository.findById(userId).orElseThrow(() -> new TubeException("Invalid User - " + userId));
        subscribedToUser.addToSubscribers(subscribedToUser.getId());
        userRepository.save(currentUser);
        userRepository.save(subscribedToUser);
    }

    public UserProfileDto getProfileInfo(String userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new TubeException("Invalid User - " + userId));
        return profileMapper.mapToDto(user);
    }
}
