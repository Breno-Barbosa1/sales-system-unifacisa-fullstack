package com.breno_barbosa1.sistema_vendas.controller;

import com.breno_barbosa1.sistema_vendas.dto.EmployeeDTO;
import com.breno_barbosa1.sistema_vendas.dto.EmployeeUpdateDTO;
import com.breno_barbosa1.sistema_vendas.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmployeeDTO>> findAll() {
        var dtoList = employeeService.findAll();

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    @GetMapping(value = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EmployeeDTO> findById(@PathVariable("id") Long id) {
        var dto = employeeService.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping(value = "/cpf/{cpf}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EmployeeDTO> findByCpf(@PathVariable("cpf") String cpf) {
        var dto = employeeService.findByCpf(cpf);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping(value = "/email/{email}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EmployeeDTO> findByEmail(@PathVariable("email") String email) {
        var dto = employeeService.findByEmail(email);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EmployeeDTO> create(@Valid @RequestBody EmployeeDTO employeeDTO) {
        var dto = employeeService.create(employeeDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EmployeeDTO> update(@Valid @RequestBody EmployeeUpdateDTO employeeDTO) {
        var dto = employeeService.update(employeeDTO);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        employeeService.delete(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}