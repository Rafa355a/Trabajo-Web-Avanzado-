package com.backlab.back_lab16.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.*;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtRequestFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwt = null;

        // Verificar si el encabezado está presente y contiene un JSON
        if (authorizationHeader != null) {
            try {
                if (authorizationHeader.startsWith("Bearer ")) {
                    jwt = authorizationHeader.substring(7); // Token como cadena
                } else {
                    // Si es JSON, parsear y extraer el token
                    jwt = new ObjectMapper().readTree(authorizationHeader).get("token").asText();
                }

                email = jwtUtil.extractCorreo(jwt);
            } catch (ExpiredJwtException e) {
                logger.warn("El token ha expirado");
            } catch (Exception e) {
                logger.warn("Formato del token inválido: " + e.getMessage());
            }
        }

        // Validar el token y autenticar al usuario
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(jwt, email)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        if (request.getRequestURI().equals("/auth/register") || request.getRequestURI().equals("/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (authorizationHeader == null) {
            logger.warn("Token JWT no presente en la solicitud.");
        }

        filterChain.doFilter(request, response);
    }
}
