package com.spellrack.server.service;

import java.util.List;

import com.spellrack.server.model.Card;
import com.spellrack.server.model.Deck;
import com.spellrack.server.model.Role;
import com.spellrack.server.model.User;

public interface UserService {
    // General User methods
    User saveUser(User user);

    User getUser(String username);

    User getByEmail(String email);

    List<User> getUsers();

    // Role-specific methods
    Role saveRole(Role role);

    void addRole(String username, String roleName);

    // Deck-specific methods
    Deck saveDeck(Deck deck);

    Deck assignDeck(String username, Deck deck);

    void removeDeck(String username, String deckTitle);

    List<Deck> getAllDecks();

    // Card-specific methods
    Card saveCard(Card card);

    void assignCard(String username, String deckTitle, Card card, Integer quantity);
}
