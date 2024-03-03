package com.duvi.blogservice.model.dto;

import com.duvi.blogservice.model.User;
import com.duvi.blogservice.model.UserRole;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public record UserDTO(Long id,
                      String username,
                      String email,
                      String password,
                      String bio,
                      String image,
                      Integer followersCount,
                      Integer followingCount,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt,
                      Boolean isFollowing ) {
    public UserDTO withFollowing(Boolean isFollowing) {
        return new UserDTO(id(), username(), email(), password(), bio(), image(), followersCount(),
                followingCount(), createdAt(), updatedAt(), isFollowing);
    }
}
