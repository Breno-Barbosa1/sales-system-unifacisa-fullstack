package com.breno_barbosa1.sistema_vendas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

public class ProductDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank
    private String productName;

    @NotNull
    private BigDecimal sellingPrice;

    @NotNull
    private BigDecimal priceAtPurchase;

    @NotNull
    private Integer stockQuantity;

    public ProductDTO() {}

    public ProductDTO(String productName, BigDecimal sellingPrice, BigDecimal priceAtPurchase, Integer stockQuantity) {
        this.productName = productName;
        this.sellingPrice = sellingPrice;
        this.priceAtPurchase = priceAtPurchase;
        this.stockQuantity = stockQuantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getPriceAtPurchase() {
        return priceAtPurchase;
    }

    public void setPriceAtPurchase(BigDecimal priceAtPurchase) {
        this.priceAtPurchase = priceAtPurchase;
    }

    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProductDTO that = (ProductDTO) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getProductName(), that.getProductName()) && Objects.equals(getSellingPrice(), that.getSellingPrice()) && Objects.equals(getPriceAtPurchase(), that.getPriceAtPurchase()) && Objects.equals(getStockQuantity(), that.getStockQuantity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getProductName(), getSellingPrice(), getPriceAtPurchase(), getStockQuantity());
    }
}