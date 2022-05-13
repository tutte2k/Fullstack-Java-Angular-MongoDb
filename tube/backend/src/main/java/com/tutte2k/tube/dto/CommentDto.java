package com.tutte2k.tube.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
    @NotBlank
    private String commentText;
    @NotBlank
    private String commentAuthor;
    @NotBlank
    private String commentAuthorPic;
    @NotBlank
    private String date;
    @Min(value = 0)
    private int likeCount;
    @Min(value = 0)
    private int disLikeCount;
}
