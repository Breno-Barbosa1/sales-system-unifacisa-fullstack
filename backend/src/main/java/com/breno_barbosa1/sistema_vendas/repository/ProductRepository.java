package com.breno_barbosa1.sistema_vendas.repository;

import com.breno_barbosa1.sistema_vendas.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductName(String name);
}
