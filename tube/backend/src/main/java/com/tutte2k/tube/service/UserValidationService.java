package com.tutte2k.tube.service;

import com.tutte2k.tube.exception.TubeException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.tutte2k.tube.dto.UserInfoDto;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class UserValidationService {

    @Value("${auth0.userinfo}")
    private String userInfoEndpoint;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    public UserInfoDto validate(String authorizationHeader) {
        if (authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            var request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(userInfoEndpoint))
                    .setHeader("Authorization", String.format("Bearer %s", token))
                    .build();

            try {
                HttpResponse<String> responseString = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                return objectMapper.readValue(responseString.body(), UserInfoDto.class);
            } catch (Exception exception) {
                throw new TubeException("Exception Occurred when validating user", exception);
            }
        } else {
            throw new TubeException("Invalid Access Token");
        }
    }
}
