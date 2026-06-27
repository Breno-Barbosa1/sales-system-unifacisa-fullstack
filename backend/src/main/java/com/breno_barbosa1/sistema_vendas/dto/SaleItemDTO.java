package com.breno_barbosa1.sistema_vendas.dto;

import jakarta.validation.constraints.NotNull;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

public class SaleItemDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull
    private Integer quantity;

    @NotNull
    private Long productId;

    @NotNull
    private BigDecimal price;

    public SaleItemDTO() {
    }

    public SaleItemDTO(Integer quantity, Long productId, BigDecimal price) {
        this.quantity = quantity;
        this.productId = productId;
        this.price = price;
    }

    public SaleItemDTO(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SaleItemDTO that = (SaleItemDTO) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getQuantity(), that.getQuantity()) && Objects.equals(getProductId(), that.getProductId()) && Objects.equals(getPrice(), that.getPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getQuantity(), getProductId(), getPrice());
    }
}