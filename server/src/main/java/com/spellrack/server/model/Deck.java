package com.spellrack.server.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.rest.core.annotation.RestResource;

@AllArgsConstructor
@Builder
@Data
@Entity
@NoArgsConstructor
@RestResource
@Table(name = "DECK")
public class Deck {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "USER_ID", nullable = false, updatable = false)
    private User user;
}
