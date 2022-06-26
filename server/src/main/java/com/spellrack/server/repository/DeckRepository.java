package com.spellrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spellrack.server.model.Deck;

public interface DeckRepository extends JpaRepository<Deck, Long> {
    Deck findByTitle(String Title);
}
