package com.backlab.back_lab16.repository;

import com.backlab.back_lab16.model.Empleado;
import com.backlab.back_lab16.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Usuario> findByCorreo(String correo);
}
