package com.spellrack.server.service;

import java.util.List;

import com.spellrack.server.model.Role;
import com.spellrack.server.model.User;

public interface UserService {
    User saveUser(User user);

    Role saveRole(Role role);

    void addRole(String username, String roleName);

    User getUser(String username);

    User getByEmail(String email);

    List<User> getUsers();
}
