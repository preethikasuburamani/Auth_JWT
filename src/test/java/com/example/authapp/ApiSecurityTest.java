package com.example.authapp;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.authapp.config.SecurityConfig;
import com.example.authapp.controller.AdminController;
import com.example.authapp.controller.HealthController;
import com.example.authapp.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = {HealthController.class, UserController.class, AdminController.class})
@Import(SecurityConfig.class)
class ApiSecurityTest {
    @Autowired MockMvc mvc;
    @MockitoBean JwtDecoder jwtDecoder;

    @Test void healthIsPublic() throws Exception { mvc.perform(get("/api/public/health")).andExpect(status().isOk()); }
    @Test void userEndpointRejectsAnonymousRequests() throws Exception { mvc.perform(get("/api/user/me")).andExpect(status().isUnauthorized()); }
    @Test void authenticatedTokenCanReachUserEndpoint() throws Exception { mvc.perform(get("/api/user/me").with(jwt())).andExpect(status().isOk()); }
    @Test void adminRequiresAdminRole() throws Exception {
        mvc.perform(get("/api/admin").with(jwt())).andExpect(status().isForbidden());
        mvc.perform(get("/api/admin").with(jwt().authorities(() -> "ROLE_ADMIN"))).andExpect(status().isOk());
    }
}
