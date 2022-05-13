package com.tutte2k.tube.repository;

import com.tutte2k.tube.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmailAddress(String email);
    Optional<User> findBySub(String sub);
    Optional<User> findById(String _id);
}

