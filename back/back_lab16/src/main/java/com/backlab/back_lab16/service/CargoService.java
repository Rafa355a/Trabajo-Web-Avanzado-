package com.backlab.back_lab16.service;

import com.backlab.back_lab16.model.Cargo;
import com.backlab.back_lab16.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    // Método para obtener todos los cargos
    public List<Cargo> getAllCargos() {
        return cargoRepository.findAll();
    }

    // Método para obtener un cargo por su ID
    public Optional<Cargo> getCargoById(Long id) {
        return cargoRepository.findById(id);
    }

    // Método para crear o actualizar un cargo
    public Cargo saveCargo(Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    // Método para eliminar un cargo por su ID
    public void deleteCargo(Long id) {
        cargoRepository.deleteById(id);
    }
}
