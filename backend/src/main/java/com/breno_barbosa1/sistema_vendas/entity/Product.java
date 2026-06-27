package com.breno_barbosa1.sistema_vendas.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "products")
public class Product implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "product_name", length = 100, nullable = false, unique = true)
    private String productName;

    @NotNull
    @Column(name = "selling_price", nullable = false)
    private BigDecimal sellingPrice;

    @NotNull
    @Column(name = "price_at_purchase", nullable = false)
    private BigDecimal priceAtPurchase;

    @NotNull
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    public Product() {}

    public Product(String productName, BigDecimal sellingPrice, BigDecimal priceAtPurchase, Integer stockQuantity) {
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

    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public BigDecimal getPriceAtPurchase() {
        return priceAtPurchase;
    }

    public void setPriceAtPurchase(BigDecimal priceAtPurchase) {
        this.priceAtPurchase = priceAtPurchase;
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
        Product product = (Product) o;
        return Objects.equals(getId(), product.getId()) && Objects.equals(getProductName(), product.getProductName()) && Objects.equals(getSellingPrice(), product.getSellingPrice()) && Objects.equals(getPriceAtPurchase(), product.getPriceAtPurchase()) && Objects.equals(getStockQuantity(), product.getStockQuantity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getProductName(), getSellingPrice(), getPriceAtPurchase(), getStockQuantity());
    }
}