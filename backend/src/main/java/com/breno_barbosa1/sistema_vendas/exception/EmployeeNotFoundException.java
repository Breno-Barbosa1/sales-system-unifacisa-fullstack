package com.breno_barbosa1.sistema_vendas.exception;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String message) {
        super(message);
    }

    public EmployeeNotFoundException() {
        super("Employee not found for this ID!");
    }
}