package com.backlab.back_lab16.repository;

import com.backlab.back_lab16.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {
    // Aquí puedes añadir métodos personalizados si es necesario
}

