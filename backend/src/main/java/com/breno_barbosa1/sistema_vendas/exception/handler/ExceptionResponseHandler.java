package com.breno_barbosa1.sistema_vendas.exception.handler;

import com.breno_barbosa1.sistema_vendas.exception.*;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestControllerAdvice
public class ExceptionResponseHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RequiredObjectIsNullException.class)
    public final ResponseEntity<ExceptionResponse> handleRequiredObjectIsNullExceptions(RequiredObjectIsNullException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductInsufficientStockQuantityException.class)
    public final ResponseEntity<ExceptionResponse> handleProductInsufficientStockQuantityExceptions(ProductInsufficientStockQuantityException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public final ResponseEntity<ExceptionResponse> handleEmployeeNotFoundExceptions(EmployeeNotFoundException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SaleNotFoundException.class)
    public final ResponseEntity<ExceptionResponse> handleSaleNotFoundExceptions(SaleNotFoundException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public final ResponseEntity<ExceptionResponse> handleProductNotFoundExceptions(ProductNotFoundException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmployeeAlreadyExistsException.class)
    public final ResponseEntity<ExceptionResponse> handleEmployeeAlreadyExistsExceptions(EmployeeAlreadyExistsException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ProductAlreadyRegisteredException.class)
    public final ResponseEntity<ExceptionResponse> handleProductAlreadyRegisteredExceptions(ProductAlreadyRegisteredException exception, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @Override
    protected @Nullable ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                "Please verify if all fields are set correctly!",
                request.getDescription(false)
        );

        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_CONTENT);
    }
}
