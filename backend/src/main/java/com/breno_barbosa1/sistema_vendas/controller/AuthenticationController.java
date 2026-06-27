package com.breno_barbosa1.sistema_vendas.controller;

import com.breno_barbosa1.sistema_vendas.security.AuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/api/login")
    public String authenticate(Authentication authentication) {
        return authenticationService.authenticate(authentication);
    }
}