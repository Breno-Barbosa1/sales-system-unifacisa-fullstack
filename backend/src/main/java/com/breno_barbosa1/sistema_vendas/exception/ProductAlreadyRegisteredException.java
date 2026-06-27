package com.breno_barbosa1.sistema_vendas.exception;

public class ProductAlreadyRegisteredException extends RuntimeException {
    public ProductAlreadyRegisteredException(String message) {
        super(message);
    }

    public ProductAlreadyRegisteredException() {
        super("Product already registered!");
    }
}