package com.example.authapp.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {
    @GetMapping("/api/admin") public Map<String, String> admin() { return Map.of("message", "Admin access granted."); }
}
