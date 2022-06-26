package com.spellrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spellrack.server.model.CardQuantity;

public interface CardQuantityRepository extends JpaRepository<CardQuantity, Long> {

}
