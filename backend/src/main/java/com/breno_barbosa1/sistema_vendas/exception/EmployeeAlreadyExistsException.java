package com.breno_barbosa1.sistema_vendas.exception;

public class EmployeeAlreadyExistsException extends RuntimeException {
    public EmployeeAlreadyExistsException(String message) {
        super(message);
    }

    public EmployeeAlreadyExistsException() {
        super("Employee already registered!");
    }
}