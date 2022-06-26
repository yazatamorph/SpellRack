package com.spellrack.server.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spellrack.server.model.Card;
import com.spellrack.server.model.CardQuantity;
import com.spellrack.server.model.Deck;
import com.spellrack.server.model.Role;
import com.spellrack.server.model.User;
import com.spellrack.server.repository.CardQuantityRepository;
import com.spellrack.server.repository.CardRepository;
import com.spellrack.server.repository.DeckRepository;
import com.spellrack.server.repository.RoleRepository;
import com.spellrack.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class UserImplementation implements UserService, UserDetailsService {
    // Repositories injected by Spring
    private final CardRepository cardRepo;
    private final CardQuantityRepository quantityRepo;
    private final DeckRepository deckRepo;
    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    // BCrypt injected by Spring
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                authorities);
    }

    // General User method overrides
    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public User getByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    // Role-specific method overrides
    @Override
    public Role saveRole(Role role) {
        return roleRepo.save(role);
    }

    @Override
    public void addRole(String username, String roleName) {
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    // Deck-specific method overrides
    @Override
    public Deck saveDeck(Deck deck) {
        return deckRepo.save(deck);
    }

    @Override
    public Deck assignDeck(String username, Deck deck) {
        User user = userRepo.findByUsername(username);
        user.getDecks().put(deck.getTitle(), deck);
        return user.getDecks().get(deck.getTitle());
    };

    @Override
    public void removeDeck(String username, String deckTitle) {
        User user = userRepo.findByUsername(username);
        user.getDecks().remove(deckTitle);
    };

    // Card-specific method overrides
    @Override
    public Card saveCard(Card card) {
        return cardRepo.save(card);
    }

    @Override
    public void assignCard(String username, String deckTitle, Card card, Integer quantity)
            throws NoSuchElementException {
        Deck deck = userRepo.findByUsername(username).getDecks().get(deckTitle);
        Card c = (cardRepo.findByScryfallId(card.getScryfallId()) != null) ? card : saveCard(card);
        if (quantity > 0) {
            if (deck.getCards().containsKey(c.getScryfallId())) {
                deck.getCards().get(c.getScryfallId()).setQuantity(quantity);
            } else {
                CardQuantity cq = quantityRepo.save(new CardQuantity(null, quantity, null,
                        c));
                deck.getCards().put(c.getScryfallId(), cq);
            }
        } else {
            deck.getCards().remove(c.getScryfallId());
        }
    };
}
