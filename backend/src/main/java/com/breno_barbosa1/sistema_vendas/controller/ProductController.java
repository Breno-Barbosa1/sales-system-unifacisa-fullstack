package com.breno_barbosa1.sistema_vendas.controller;

import com.breno_barbosa1.sistema_vendas.dto.ProductDTO;
import com.breno_barbosa1.sistema_vendas.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProductDTO>> findAll() {
        var dtoList = productService.findAll();

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    @GetMapping(value = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProductDTO> findById(@PathVariable("id") Long id) {
        var dto = productService.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping(value = "/name/{name}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProductDTO> findByProductName(@PathVariable("name") String name) {
        var dto = productService.findByProductName(name);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProductDTO> create(@Valid @RequestBody ProductDTO productDTO) {
        var dto = productService.create(productDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProductDTO> update(@Valid @RequestBody ProductDTO productDTO) {
        var dto = productService.update(productDTO);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        productService.delete(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}