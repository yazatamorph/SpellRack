package com.spellrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spellrack.server.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {
    Card findByScryfallId(String scryfallId);
}
