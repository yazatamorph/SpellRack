package com.spellrack.server.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spellrack.server.model.Card;
import com.spellrack.server.model.Deck;
import com.spellrack.server.model.User;
import com.spellrack.server.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class DeckController {
    private final UserService userService;

    @GetMapping("/decks")
    public ResponseEntity<List<Deck>> getAllDecks() {
        return ResponseEntity.ok().body(userService.getAllDecks());
    }

    @PostMapping("/user/decks")
    public ResponseEntity<Map<String, Deck>> getUserDecks(@RequestBody AllUserDecksBody body) {
        return ResponseEntity.ok().body(userService.getUser(body.getUsername()).getDecks());
    }

    @PostMapping("/user/deck")
    public ResponseEntity<Deck> getOneDeck(@RequestBody OneDeckBody body) {
        return ResponseEntity.ok().body(userService.getUser(body.getUsername()).getDecks().get(body.getDeckTitle()));
    }

    @PostMapping("/user/deck/new")
    public ResponseEntity<Object> createDeck(@RequestBody Deck deck) {
        try {
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.getUser(username);
            if (user == null) {
                throw new Exception("Associated user does not exist");
            } else if (user.getDecks().get(deck.getTitle()) != null) {
                throw new Exception("User already owns a deck with this title");
            }
            // Deck savedDeck = userService.saveDeck(deck);
            return ResponseEntity.ok().body(userService.assignDeck(username, userService.saveDeck(deck)));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(new ErrorBody(e.getMessage()));
        }
    }

    @DeleteMapping("/user/deck")
    public ResponseEntity<?> deleteDeck(@RequestBody Deck deck) {
        try {
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Deck deckExists = userService.getUser(username).getDecks().get(deck.getTitle());
            if (deckExists == null || deck.getId() != deckExists.getId()) {
                throw new Exception("User does not own this deck");
            }
            userService.removeDeck(username, deck.getTitle());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/user/deck/card")
    public ResponseEntity<?> updateDeckCard(@RequestBody UpdateDeckCardBody body) {
        try {
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Deck deck = userService.getUser(username).getDecks().get(body.getDeckTitle());
            if (deck == null || deck.getId() != body.getDeckId()) {
                throw new Exception("User does not own this deck");
            }
            userService.assignCard(username, body.getDeckTitle(), body.getCard(), body.getQuantity());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

@Data
class OneDeckBody {
    private String username;
    private String deckTitle;
}

@Data
class AllUserDecksBody {
    String username;
}

@Data
class UpdateDeckCardBody {
    Long deckId;
    String deckTitle;
    Card card;
    Integer quantity;
}

@AllArgsConstructor
@Data
class ErrorBody {
    String error;
}
