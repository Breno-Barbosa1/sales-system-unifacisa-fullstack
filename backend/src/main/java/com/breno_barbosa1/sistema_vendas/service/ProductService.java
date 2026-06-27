package com.breno_barbosa1.sistema_vendas.service;

import com.breno_barbosa1.sistema_vendas.dto.ProductDTO;
import com.breno_barbosa1.sistema_vendas.entity.Product;
import com.breno_barbosa1.sistema_vendas.exception.ProductAlreadyRegisteredException;
import com.breno_barbosa1.sistema_vendas.exception.ProductNotFoundException;
import com.breno_barbosa1.sistema_vendas.exception.RequiredObjectIsNullException;
import com.breno_barbosa1.sistema_vendas.mapper.ProductMapper;
import com.breno_barbosa1.sistema_vendas.repository.ProductRepository;
import jakarta.persistence.Entity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public List<ProductDTO> findAll() {
        List<Product> productList = productRepository.findAll();

        if(!productList.isEmpty()) {
            return productList
                .stream()
                .map(productMapper::productToProductDTO)
                .toList();
        }
        return List.of();
    }

    public ProductDTO findById(Long id) {
        var entity = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("No product found for ID: " + id));

        return productMapper.productToProductDTO(entity);
    }

    public ProductDTO findByProductName(String name) {
        var entity = productRepository.findByProductName(name)
                .orElseThrow(() -> new ProductNotFoundException("No product found with name: " + name));

        return productMapper.productToProductDTO(entity);
    }

    public ProductDTO create(ProductDTO productDTO) {
        if(productDTO == null) throw new RequiredObjectIsNullException();

        if(productRepository.findByProductName(productDTO.getProductName()).isPresent())
            throw new ProductAlreadyRegisteredException(
                "Product with name " + productDTO.getProductName() + "already exists!");

        var entity = productMapper.productDTOToProduct(productDTO);

        return productMapper.productToProductDTO(productRepository.save(entity));
    }

    public ProductDTO update(ProductDTO productDTO) {
        if(productDTO == null) throw new RequiredObjectIsNullException();

        var entity = productRepository.findById(productDTO.getId())
            .orElseThrow(() -> new ProductNotFoundException("No product found for ID: " + productDTO.getId()));

        entity.setProductName(productDTO.getProductName());
        entity.setPriceAtPurchase(productDTO.getPriceAtPurchase());
        entity.setSellingPrice(productDTO.getSellingPrice());
        entity.setStockQuantity(productDTO.getStockQuantity());

        return productMapper.productToProductDTO(productRepository.save(entity));
    }

    public void delete(Long id) {
        var entity = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException("No product found for ID: " + id));

        productRepository.delete(entity);
    }
}