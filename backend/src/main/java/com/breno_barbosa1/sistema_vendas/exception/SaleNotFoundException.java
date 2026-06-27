package com.breno_barbosa1.sistema_vendas.exception;

public class SaleNotFoundException extends RuntimeException {
    public SaleNotFoundException(String message) {
        super(message);
    }

    public SaleNotFoundException() {
        super("Sale not found for this ID!");
    }
}