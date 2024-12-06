package com.backlab.back_lab16.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private String secretKey = "d8e3fa430770595770f26db61ffe9764e4f48fe5701506d469315235eed2ed0d6cb9dd8cf9f1e495ff191a5cf041ecce5c699c8db31c893db3d4f51e9aeeec6b5328bdcefebab172a9e2260e3863f20be74cc15794b547f5ded0354b98fcbd3c95487faba89a9410b2ad2035b437d203e6402ec20ae178261ff7e856df172262bb5abd4fc8b925858caab452e08724e425d4c88475cbe8514c93070ae727afbe3ca5ac198a1b9b43251993e285062b30110cc439bcff728b925f46dd3a2129693e025af708b413c55015f13c8661604f4279f4eb48586af56fa898fcc99d71a17d6edd6ebde0a9ee7e7126efdb7da31ba0866e6ea36032c7e4b9fd4abf7f3e72";  // Utiliza una clave secreta más segura en producción

    // Genera un token JWT para un usuario dado
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // 1 hora de expiración
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Extrae el correo del token
    public String extractCorreo(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Valida si el token ha expirado
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extrae la fecha de expiración del token
    private Date extractExpiration(String token) {
        Claims claims = extractClaims(token);
        return claims.getExpiration();
    }

    // Extrae todos los claims (información) del token
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    // Valida el token
    public boolean validateToken(String token, String email) {
        return email.equals(extractCorreo(token)) && !isTokenExpired(token);
    }
}

