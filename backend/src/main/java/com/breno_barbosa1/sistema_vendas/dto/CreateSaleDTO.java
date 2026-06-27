package com.breno_barbosa1.sistema_vendas.dto;

import jakarta.validation.constraints.NotNull;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class CreateSaleDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull
    private Long employeeId;

    @NotNull
    private List<SaleItemDTO> saleItemDTOS;

    public CreateSaleDTO() {}

    public CreateSaleDTO(Long employeeId, List<SaleItemDTO> saleItemDTOS) {
        this.employeeId = employeeId;
        this.saleItemDTOS = saleItemDTOS;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public List<SaleItemDTO> getSaleItemDTOS() {
        return saleItemDTOS;
    }

    public void setSaleItemDTOS(List<SaleItemDTO> saleItemDTOS) {
        this.saleItemDTOS = saleItemDTOS;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CreateSaleDTO that = (CreateSaleDTO) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getEmployeeId(), that.getEmployeeId()) && Objects.equals(getSaleItemDTOS(), that.getSaleItemDTOS());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmployeeId(), getSaleItemDTOS());
    }
}