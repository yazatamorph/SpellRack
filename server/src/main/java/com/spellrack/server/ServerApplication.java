package com.spellrack.server;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.spellrack.server.auth.Roles;
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

			userService
					.saveUser(new User(null, "zareensuxx", "zareensuxx@gmail.com", "beepboopboop", new ArrayList<>()));

			userService.addRole("zareensuxx", Roles.USER.value());
			userService.addRole("zareensuxx", Roles.SUPER.value());
		};
	}

}
