package com.spellrack.server.auth;

public enum Roles {
    USER("role_user"),
    MANAGER("role_manager"),
    ADMIN("role_admin"),
    SUPER("role_super_admin");

    private final String value;

    Roles(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }
}
