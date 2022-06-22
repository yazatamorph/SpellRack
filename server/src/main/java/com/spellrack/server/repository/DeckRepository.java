package com.spellrack.server.repository;

import com.spellrack.server.model.Deck;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "deck", path = "deck")
public interface DeckRepository extends JpaRepository<Deck, Long> {
    // Deck findById(Long deckId);
}
