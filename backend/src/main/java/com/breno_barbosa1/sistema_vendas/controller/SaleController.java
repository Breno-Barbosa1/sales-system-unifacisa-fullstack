package com.breno_barbosa1.sistema_vendas.controller;

import com.breno_barbosa1.sistema_vendas.dto.CreateSaleDTO;
import com.breno_barbosa1.sistema_vendas.dto.SaleDTO;
import com.breno_barbosa1.sistema_vendas.service.SaleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SaleDTO>> findAll() {
        var dtoList = saleService.findAll();

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    @GetMapping(value = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<SaleDTO> findById(@PathVariable("id") Long id) {
        var dto = saleService.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PostMapping(
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<SaleDTO> create(@Valid @RequestBody CreateSaleDTO saleDTO) {
        var dto = saleService.create(saleDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        saleService.delete(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}