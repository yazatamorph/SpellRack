package com.spellrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spellrack.server.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
