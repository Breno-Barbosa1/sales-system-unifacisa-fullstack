package com.breno_barbosa1.sistema_vendas.exception;

public class ProductInsufficientStockQuantityException extends RuntimeException {
    public ProductInsufficientStockQuantityException(String message) {
        super(message);
    }
}
