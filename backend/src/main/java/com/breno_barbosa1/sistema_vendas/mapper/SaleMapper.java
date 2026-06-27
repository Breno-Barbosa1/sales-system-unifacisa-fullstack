package com.breno_barbosa1.sistema_vendas.mapper;

import com.breno_barbosa1.sistema_vendas.dto.CreateSaleDTO;
import com.breno_barbosa1.sistema_vendas.dto.SaleDTO;
import com.breno_barbosa1.sistema_vendas.entity.Sale;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
    componentModel = "spring",
    uses = SaleItemMapper.class
)
public interface SaleMapper {
    @Mapping(source = "employee.id", target = "employeeId")
    SaleDTO saleToSaleDTO(Sale sale);

    Sale saleDTOtoSale(SaleDTO saleDTO);
    Sale createSaleDTOtoSale(CreateSaleDTO createSaleDTO);
    SaleDTO createSaleDTOtoSaleDTO(CreateSaleDTO createSaleDTO);
}