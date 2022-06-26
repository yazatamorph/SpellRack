package com.spellrack.server.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Entity
@NoArgsConstructor
public class Card implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String scryfallId; // this matches Scryfall's id
    private String uri; // leads to json resource on Scryfall API
    private String scryfallUri; // leads to the actual Scryfall page
    private String name;
    private String typeLine;
    private String setName;
    private String set_abbr;
    private String rarity;
    private Integer cmc; // AKA 'mana value'
    private String collectorNumber;
    @ElementCollection
    @CollectionTable(name = "card_image_uri_list")
    private List<String> imageUris = new LinkedList<>(); // Ordered list of card face images - should have 1 OR 2
                                                         // entries
    @ElementCollection
    @CollectionTable(name = "color_array")
    private Collection<String> colors = new ArrayList<>(); // list of color abbreviations (i.e. W, U, B, R, G) - may be
                                                           // empty
    @ElementCollection
    @CollectionTable(name = "color_identity_array")
    private Collection<String> colorIdentity = new ArrayList<>(); // list of color abbreviations (i.e. W, U, B, R, G) -
                                                                  // may be empty
    private String printsSearchUri; // // leads to json resource on Scryfall API
}
