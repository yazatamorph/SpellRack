package com.spellrack.server;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.spellrack.server.model.Role;
import com.spellrack.server.model.User;
import com.spellrack.server.service.UserService;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(null, "ROLL_USER"));
			userService.saveRole(new Role(null, "ROLL_MANAGER"));
			userService.saveRole(new Role(null, "ROLL_ADMIN"));
			userService.saveRole(new Role(null, "ROLL_SUPER"));

			userService
					.saveUser(new User(null, "zareensuxx", "zareensuxx@gmail.com", "beepboopboop", new ArrayList<>()));

			userService.addRole("zareensuxx", "ROLL_USER");
			userService.addRole("zareensuxx", "ROLL_SUPER");
		};
	}

}
