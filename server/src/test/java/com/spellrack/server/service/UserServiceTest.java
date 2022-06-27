package com.spellrack.server.service;

import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.spellrack.server.ServerApplication;
import com.spellrack.server.model.Deck;
import com.spellrack.server.model.User;

@SpringBootTest(classes = ServerApplication.class)
public class UserServiceTest {
    @Autowired
    private UserService underTest;

    @Test
    @Transactional
    @Rollback(true)
    void saveUserShouldReturnUserObject() {
        // given
        // when
        Object returnValue = underTest
                .saveUser(new User(null, "testuser1", "user1@test.com", "thisisapassword", null, null));
        // then
        AssertionsForClassTypes.assertThat(returnValue).isInstanceOf(User.class);
    };

    @Test
    @Transactional
    @Rollback(true)
    void saveDeckShouldReturnDeckObject() {
        // given
        // when
        Object returnValue = underTest
                .saveDeck(new Deck(null, "test deck title", null));
        // then
        AssertionsForClassTypes.assertThat(returnValue).isInstanceOf(Deck.class);
    };

}
