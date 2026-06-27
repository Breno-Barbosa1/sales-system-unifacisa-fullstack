package com.breno_barbosa1.sistema_vendas.service;

import com.breno_barbosa1.sistema_vendas.dto.CreateSaleDTO;
import com.breno_barbosa1.sistema_vendas.dto.SaleDTO;
import com.breno_barbosa1.sistema_vendas.dto.SaleItemDTO;
import com.breno_barbosa1.sistema_vendas.entity.Employee;
import com.breno_barbosa1.sistema_vendas.entity.Product;
import com.breno_barbosa1.sistema_vendas.entity.Sale;
import com.breno_barbosa1.sistema_vendas.entity.SaleItem;
import com.breno_barbosa1.sistema_vendas.exception.*;
import com.breno_barbosa1.sistema_vendas.mapper.SaleItemMapper;
import com.breno_barbosa1.sistema_vendas.mapper.SaleMapper;
import com.breno_barbosa1.sistema_vendas.repository.EmployeeRepository;
import com.breno_barbosa1.sistema_vendas.repository.ProductRepository;
import com.breno_barbosa1.sistema_vendas.repository.SaleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SaleService {

    private final EmployeeRepository employeeRepository;
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;
    private final SaleMapper saleMapper;
    private final SaleItemMapper saleItemMapper;

    public SaleService(EmployeeRepository employeeRepository, ProductRepository productRepository, SaleRepository saleRepository, SaleMapper saleMapper, SaleItemMapper saleItemMapper) {
        this.employeeRepository = employeeRepository;
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
        this.saleMapper = saleMapper;
        this.saleItemMapper = saleItemMapper;
    }

    public List<SaleDTO> findAll() {
        List<Sale> salesList = saleRepository.findAll();

        if(!salesList.isEmpty()) {
            List<SaleDTO> dtoList = new ArrayList<>();

            for (Sale sale : salesList) {
                var dto = saleMapper.saleToSaleDTO(sale);
                dto.setCreatedAt(sale.getCreatedAt());
                dto.getSaleItems().forEach(saleItemDTO -> {
                    sale.getSaleItems().forEach(saleItem -> {
                        if (saleItem.getProduct().getId().equals(saleItemDTO.getProductId())) {
                            saleItemDTO.setPrice(saleItem.getPrice());
                        }
                    });
                });

                dtoList.add(dto);
            }

            return dtoList;
        }

        return List.of();
    }

    public SaleDTO findById(Long id) {
        var entity = saleRepository.findById(id)
            .orElseThrow(() -> new SaleNotFoundException("No sale found for ID: " + id));

        return saleMapper.saleToSaleDTO(entity);
    }

    @Transactional
    public SaleDTO create(CreateSaleDTO createSaleDTO) {
        if(createSaleDTO == null) throw new RequiredObjectIsNullException();

        var saleItemsList = createSaleDTO.getSaleItemDTOS()
            .stream()
            .map(
                saleItemDTO -> {
                    Product product = productRepository.findById(saleItemDTO.getProductId())
                        .orElseThrow(() -> new ProductNotFoundException("Product not found for ID: " + saleItemDTO.getProductId()));

                    SaleItem saleItem = new SaleItem();

                    saleItem.setProduct(product);
                    saleItem.setPrice(product.getSellingPrice());
                    saleItem.setQuantity(saleItemDTO.getQuantity());

                    if (product.getStockQuantity() < saleItem.getQuantity())
                        throw new ProductInsufficientStockQuantityException("Insufficient stock quantity for product: " + product.getProductName());

                    product.setStockQuantity(product.getStockQuantity() - saleItem.getQuantity());

                    return saleItem;
                }
            )
            .toList();

        BigDecimal totalAmount = saleItemsList
            .stream()
            .map(item -> item.getPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        var entity = saleMapper.createSaleDTOtoSale(createSaleDTO);

        saleItemsList.forEach(item -> item.setSale(entity));

        Employee employee = employeeRepository.findById(createSaleDTO.getEmployeeId())
            .orElseThrow(() -> new EmployeeNotFoundException("Employee not found for ID: " + createSaleDTO.getEmployeeId()));

        entity.setCreatedAt(LocalDateTime.now());
        entity.setSaleItems(saleItemsList);
        entity.setTotalAmount(totalAmount);
        entity.setEmployee(employee);

        var dto = saleMapper.saleToSaleDTO(saleRepository.saveAndFlush(entity));
        dto.setEmployeeId(entity.getEmployee().getId());
        dto.setCreatedAt(LocalDateTime.now());

        for (SaleItem saleItem : saleItemsList) {
            for (SaleItemDTO saleItemDTO : dto.getSaleItems()) {
                if (saleItem.getProduct().getId().equals(saleItemDTO.getProductId())) {
                    saleItemDTO.setPrice(saleItem.getPrice());
                }
            }
        }

        return dto;
    }

    public void delete(Long id) {
        var entity = saleRepository.findById(id)
            .orElseThrow(() -> new SaleNotFoundException("No sale found for ID: " + id));

        saleRepository.delete(entity);
    }
}