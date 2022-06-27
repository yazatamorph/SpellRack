package com.spellrack.server.repository;

import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.spellrack.server.ServerApplication;
import com.spellrack.server.model.User;

@SpringBootTest(classes = ServerApplication.class)
public class UserRepositoryTest {
    @Autowired
    private UserRepository underTest;

    @Test
    @Transactional
    @Rollback(true)
    void itShouldFindByUsername() {
        // given
        User user = new User(null, "testuser1", "user1@test.com", "thisisapassword", null, null);
        underTest.save(user);
        // when
        User result = underTest.findByUsername("testuser1");
        // then
        AssertionsForClassTypes.assertThat(result).isInstanceOf(User.class);
    };

    @Test
    @Transactional
    @Rollback(true)
    void itShouldFindByEmail() {
        // given
        User user = new User(null, "testuser1", "user1@test.com", "thisisapassword", null, null);
        underTest.save(user);
        // when
        User result = underTest.findByEmail("user1@test.com");
        AssertionsForClassTypes.assertThat(result).isInstanceOf(User.class);
    }

}
