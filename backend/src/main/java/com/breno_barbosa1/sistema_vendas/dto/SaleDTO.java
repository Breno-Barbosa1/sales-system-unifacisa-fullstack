package com.breno_barbosa1.sistema_vendas.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class SaleDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull
    private BigDecimal totalAmount;

    @NotNull
    private Long employeeId;

    @NotNull
    private List<SaleItemDTO> saleItems;

    @NotNull
    private LocalDateTime createdAt;

    public SaleDTO() {}

    public SaleDTO(BigDecimal totalAmount, Long employeeId, List<SaleItemDTO> saleItems) {
        this.totalAmount = totalAmount;
        this.employeeId = employeeId;
        this.saleItems = saleItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<SaleItemDTO> getSaleItems() {
        return saleItems;
    }

    public void setSaleItems(List<SaleItemDTO> saleItems) {
        this.saleItems = saleItems;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SaleDTO saleDTO = (SaleDTO) o;
        return Objects.equals(getId(), saleDTO.getId()) && Objects.equals(getTotalAmount(), saleDTO.getTotalAmount()) && Objects.equals(getEmployeeId(), saleDTO.getEmployeeId()) && Objects.equals(getSaleItems(), saleDTO.getSaleItems()) && Objects.equals(getCreatedAt(), saleDTO.getCreatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTotalAmount(), getEmployeeId(), getSaleItems(), getCreatedAt());
    }
}