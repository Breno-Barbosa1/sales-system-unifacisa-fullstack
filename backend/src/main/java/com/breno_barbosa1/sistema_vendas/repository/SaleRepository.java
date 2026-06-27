package com.breno_barbosa1.sistema_vendas.repository;

import com.breno_barbosa1.sistema_vendas.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
}
