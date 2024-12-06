package com.backlab.back_lab16.controller;


import com.backlab.back_lab16.model.Cargo;
import com.backlab.back_lab16.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/cargos")
public class CargoController {

    @Autowired
    private CargoService cargoService;

    // Endpoint para obtener todos los cargos
    @GetMapping
    public List<Cargo> getAllCargos() {
        return cargoService.getAllCargos();
    }

    // Endpoint para obtener un cargo por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Cargo> getCargoById(@PathVariable Long id) {
        Optional<Cargo> cargo = cargoService.getCargoById(id);
        return cargo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para crear o actualizar un cargo
    @PostMapping
    public ResponseEntity<Cargo> createCargo(@RequestBody Cargo cargo) {
        Cargo savedCargo = cargoService.saveCargo(cargo);
        return ResponseEntity.ok(savedCargo);
    }

    // Endpoint para actualizar un cargo
    @PutMapping("/{id}")
    public ResponseEntity<Cargo> updateCargo(@PathVariable Long id, @RequestBody Cargo cargo) {
        if (cargoService.getCargoById(id).isPresent()) {
            cargo.setId(id);
            Cargo updatedCargo = cargoService.saveCargo(cargo);
            return ResponseEntity.ok(updatedCargo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para eliminar un cargo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        if (cargoService.getCargoById(id).isPresent()) {
            cargoService.deleteCargo(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
