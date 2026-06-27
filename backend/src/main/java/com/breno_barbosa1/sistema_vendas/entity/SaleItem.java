package com.breno_barbosa1.sistema_vendas.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "sale_item")
public class SaleItem implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public SaleItem() {
    }

    public SaleItem(Product product, Sale sale, BigDecimal price, Integer quantity) {
        this.product = product;
        this.sale = sale;
        this.price = price;
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Sale getSale() {
        return sale;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SaleItem saleItem = (SaleItem) o;
        return Objects.equals(getId(), saleItem.getId()) && Objects.equals(getQuantity(), saleItem.getQuantity()) && Objects.equals(getPrice(), saleItem.getPrice()) && Objects.equals(getSale(), saleItem.getSale()) && Objects.equals(getProduct(), saleItem.getProduct());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getQuantity(), getPrice(), getSale(), getProduct());
    }
}