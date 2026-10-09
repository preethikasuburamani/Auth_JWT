package com.example.authapp.controller;

import java.util.List;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/me") public Map<String, Object> me(JwtAuthenticationToken auth) {
        var jwt = auth.getToken();
        return Map.of("subject", jwt.getSubject(), "username", value(jwt.getClaimAsString("preferred_username")),
                "email", value(jwt.getClaimAsString("email")), "name", value(jwt.getClaimAsString("name")), "roles", roles(auth));
    }
    @GetMapping("/dashboard") public Map<String, Object> dashboard(Authentication auth) {
        return Map.of("message", "You reached the protected dashboard API.", "username", auth.getName());
    }
    private static String value(String value) { return value == null ? "" : value; }
    private static List<String> roles(Authentication auth) { return auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList(); }
}
