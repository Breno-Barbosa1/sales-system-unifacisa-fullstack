package com.breno_barbosa1.sistema_vendas.mapper;

import com.breno_barbosa1.sistema_vendas.dto.SaleItemDTO;
import com.breno_barbosa1.sistema_vendas.entity.SaleItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SaleItemMapper {

    SaleItem saleItemDTOToSaleItem(SaleItemDTO saleItemDTO);

    @Mapping(source = "product.id", target = "productId")
    SaleItemDTO saleItemToSaleItemDTO(SaleItem saleItem);
}