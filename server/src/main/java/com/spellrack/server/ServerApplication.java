package com.spellrack.server;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.spellrack.server.auth.Roles;
import com.spellrack.server.model.Card;
import com.spellrack.server.model.Deck;
import com.spellrack.server.model.Role;
import com.spellrack.server.model.User;
import com.spellrack.server.service.UserService;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(null, Roles.USER.value()));
			userService.saveRole(new Role(null, Roles.MANAGER.value()));
			userService.saveRole(new Role(null, Roles.ADMIN.value()));
			userService.saveRole(new Role(null, Roles.SUPER.value()));

			userService.saveUser(new User(null, "zareensuxx", "zareensuxx@gmail.com", "beepboopboop", new ArrayList<>(),
					new HashMap<>()));

			userService.addRole("zareensuxx", Roles.USER.value());
			userService.addRole("zareensuxx", Roles.SUPER.value());

			userService.assignDeck("zareensuxx", new Deck(null, "My Test Deck", new HashMap<>()));

			List<String> uriList = new LinkedList<>();
			Collection<String> colorCollection = new ArrayList<>();
			Collection<String> colorIdCollection = new ArrayList<>();

			Card testCard = userService
					.saveCard(new Card(null, "pretendScryfallId", null, null, null, null, null,
							null, null, null, null,
							uriList, colorCollection, colorIdCollection,
							null));
			Card bestCard = new Card(null, "anotherScryfallId", null, null, null, null, null,
					null, null, null, null,
					uriList, colorCollection, colorIdCollection,
					null);

			userService.assignCard("zareensuxx", "My Test Deck", testCard, 2);
			userService.assignCard("zareensuxx", "My Test Deck", bestCard, 4);
			// userService.removeDeck("zareensuxx", "My Test Deck");
		};
	}

}
