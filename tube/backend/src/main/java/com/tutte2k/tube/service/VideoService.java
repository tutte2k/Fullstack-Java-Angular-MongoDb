package com.tutte2k.tube.service;

import com.tutte2k.tube.dto.CommentDto;
import com.tutte2k.tube.dto.UploadVideoResponse;
import com.tutte2k.tube.dto.VideoDto;
import com.tutte2k.tube.exception.TubeException;
import com.tutte2k.tube.mapper.CommentMapper;
import com.tutte2k.tube.mapper.VideoMapper;
import com.tutte2k.tube.model.Video;
import com.tutte2k.tube.model.VideoStatus;
import com.tutte2k.tube.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final S3Service s3Service;
    private final UserService userService;
    private final VideoMapper videoMapper;
    private final CommentMapper commentMapper;

    public UploadVideoResponse uploadVideo(MultipartFile file, String userId) {
        String url = s3Service.upload(file);
        var video = new Video();
        video.setUrl(url);
        Objects.requireNonNull(userId);
        video.setUserId(userId);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd");
        LocalDate localDate = LocalDate.now();
        video.setDate(localDate.toString());
        videoRepository.save(video);
        return new UploadVideoResponse(video.getId(), url);
    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        var video = getVideoById(videoId);
        String url = s3Service.upload(file);
        video.setThumbnailUrl(url);
        videoRepository.save(video);
        return url;
    }

    public List<VideoDto> getAllVideos() {
        return videoRepository.findAll()
                .stream()
                .filter(video -> VideoStatus.PUBLIC.equals(video.getVideoStatus()))
                .map(videoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public VideoDto getVideo(String id) {
        var videoDto = videoMapper.mapToDto(getVideoById(id));
        increaseViewCount(videoDto);
        return videoDto;
    }

    public List<VideoDto> getAllVideosByChannel(String userId) {
        List<Video> videos = videoRepository.findByUserId(userId);
        return videos.stream()
                .map(videoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public VideoDto editVideoMetadata(VideoDto videoMetaDataDto) {
        var video = getVideoById(videoMetaDataDto.getVideoId());
        video.setTitle(videoMetaDataDto.getVideoName());
        video.setDescription(videoMetaDataDto.getDescription());
        video.setUrl(videoMetaDataDto.getUrl());
        // Ignore Channel ID as it should not be possible to change the Channel of a Video
        video.setTags(videoMetaDataDto.getTags());
        video.setVideoStatus(videoMetaDataDto.getVideoStatus());
        // View Count is also ignored as its calculated independently
        videoRepository.save(video);
        return videoMapper.mapToDto(video);
    }

    public void deleteVideo(String id) {
        String videoUrl = getVideo(id).getUrl();
        s3Service.deleteFile(videoUrl);
    }

    public List<VideoDto> getSuggestedVideos(String userId) {
        Set<String> likedVideos = userService.getLikedVideos(userId);
        List<Video> likedVideoList = videoRepository.findByIdIn(likedVideos);
        List<String> tags = likedVideoList.stream()
                .map(Video::getTags)
                .flatMap(List::stream)
                .collect(Collectors.toList());

        return videoRepository.findByTagsIn(tags)
                .stream()
                .limit(5)
                .map(videoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    private void increaseViewCount(VideoDto videoDto) {
        var videoById = getVideoById(videoDto.getVideoId());
        videoById.increaseViewCount();
        videoRepository.save(videoById);
    }

    private Video getVideoById(String id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new TubeException("Cannot find Video with ID - " + id));
    }

    public VideoDto like(String videoId) {
        var video = getVideoById(videoId);

        if (userService.ifLikedVideo(videoId)) {
            video.decreaseLikeCount();
            userService.removeFromLikedVideos(videoId);
        } else if (userService.ifDisLikedVideo(videoId)) {
            video.decreaseDisLikeCount();
            userService.removeFromDisLikedVideo(videoId);
        } else {
            video.increaseLikeCount();
            userService.addToLikedVideos(videoId);
        }
        videoRepository.save(video);
        return videoMapper.mapToDto(video);
    }

    public VideoDto dislike(String videoId) {
        var video = getVideoById(videoId);

        if (userService.ifDisLikedVideo(videoId)) {
            video.decreaseDisLikeCount();
            userService.removeFromDisLikedVideo(videoId);
        } else if (userService.ifLikedVideo(videoId)) {
            video.decreaseLikeCount();
            userService.removeFromLikedVideos(videoId);
        } else {
            video.increaseDisLikeCount();
            userService.addToDisLikedVideo(videoId);
        }
        videoRepository.save(video);
        return videoMapper.mapToDto(video);
    }

    public void addComment(CommentDto commentDto, String videoId) {
        var video = getVideoById(videoId);
        var comment = commentMapper.mapFromDto(commentDto);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("uuuu/MM/dd");
        String localDate = LocalDate.now().toString();
        comment.setDate(localDate);
        video.addComment(comment);
        videoRepository.save(video);
    }

    public List<CommentDto> getAllComments(String videoId) {
        return videoRepository.findById(videoId)
                .stream()
                .map(video -> commentMapper.mapToDtoList(video.getComments()))
                .findAny().orElse(Collections.emptyList());
    }
}
