package com.tutte2k.tube.controller;

import com.tutte2k.tube.dto.UserInfoDto;
import com.tutte2k.tube.dto.UserProfileDto;
import com.tutte2k.tube.service.UserRegistrationService;
import com.tutte2k.tube.service.UserService;
import com.tutte2k.tube.service.UserValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRegistrationService userRegistrationService;
    private final UserValidationService userValidationService;
    private final UserService userService;


    @GetMapping("{id}/history")
    @ResponseStatus(HttpStatus.OK)
    public Set<String> userHistory(@PathVariable String id) {
        return userService.getHistory(id);
    }

    @GetMapping("validate")
    @ResponseStatus(HttpStatus.OK)
    public UserInfoDto registerUser(HttpServletRequest httpServletRequest) {
        var userInfoDto = userValidationService.validate(httpServletRequest.getHeader("Authorization"));
        userRegistrationService.register(userInfoDto);
        return userInfoDto;
    }

    @PostMapping("subscribe/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void subscribeUser(@PathVariable String userId) {
        userService.subscribeUser(userId);
    }

    @GetMapping("{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserProfileDto getProfileById(@PathVariable String userId) {return userService.getProfileInfo(userId);}
}