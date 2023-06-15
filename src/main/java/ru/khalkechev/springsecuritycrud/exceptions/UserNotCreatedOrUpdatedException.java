package ru.khalkechev.springsecuritycrud.exceptions;

import org.springframework.validation.Errors;

public class UserNotCreatedOrUpdatedException extends RuntimeException {
    private Errors fieldsWithError;

    public UserNotCreatedOrUpdatedException(String message, Errors fieldsWithError) {
        super(message);
        this.fieldsWithError = fieldsWithError;
    }

    public Errors getFieldsWithError() {
        return fieldsWithError;
    }
}
