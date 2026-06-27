package com.breno_barbosa1.sistema_vendas.exception;

public class RequiredObjectIsNullException extends RuntimeException {
    public RequiredObjectIsNullException() {
        super("This object cannot be null!");
    }
}
