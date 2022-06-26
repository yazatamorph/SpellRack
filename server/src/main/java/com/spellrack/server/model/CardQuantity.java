package com.spellrack.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Entity
@Data
@NoArgsConstructor
public class CardQuantity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer quantity;

    @Column(name = "card_scryfall_id", insertable = false, updatable = false)
    private String cardScryfallId;
    @OneToOne
    @JoinColumn(name = "card_scryfall_id", referencedColumnName = "scryfallId")
    private Card card;
}
