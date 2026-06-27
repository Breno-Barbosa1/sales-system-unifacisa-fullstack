package com.breno_barbosa1.sistema_vendas.mapper;

import com.breno_barbosa1.sistema_vendas.dto.ProductDTO;
import com.breno_barbosa1.sistema_vendas.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product productDTOToProduct(ProductDTO productDTO);
    ProductDTO productToProductDTO(Product product);
}
