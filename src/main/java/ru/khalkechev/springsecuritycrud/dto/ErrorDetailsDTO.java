package ru.khalkechev.springsecuritycrud.dto;

import org.springframework.validation.FieldError;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotCreatedOrUpdatedException;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ErrorDetailsDTO {
    private String message;
    private Map<String, String> errors = new HashMap<>();

    public ErrorDetailsDTO(UserNotCreatedOrUpdatedException e) {
        message = e.getMessage();
        List<FieldError> fieldErrors = e.getFieldsWithError().getFieldErrors();
        for (FieldError err : fieldErrors) {
            if (errors.containsKey(err.getField())) {
                String oldValue = errors.get(err.getField()) + ". ";
                errors.replace(err.getField(), oldValue + err.getDefaultMessage());
            } else {
                errors.put(err.getField(), err.getDefaultMessage());
            }
        }
    }

    public ErrorDetailsDTO(UserNotFoundException e) {
        message = e.getMessage();
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
