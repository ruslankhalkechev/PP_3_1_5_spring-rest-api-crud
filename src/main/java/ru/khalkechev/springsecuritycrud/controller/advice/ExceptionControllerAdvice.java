package ru.khalkechev.springsecuritycrud.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.khalkechev.springsecuritycrud.dto.ErrorDetailsDTO;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotCreatedOrUpdatedException;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotFoundException;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(UserNotCreatedOrUpdatedException.class)
    public ResponseEntity<ErrorDetailsDTO> exceptionUserNotCreatedOrUpdatedHandler(UserNotCreatedOrUpdatedException e) {
        ErrorDetailsDTO errorDetailsDTO = new ErrorDetailsDTO(e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDetailsDTO);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDetailsDTO> exceptionUserNotFoundHandler(UserNotFoundException e) {
        ErrorDetailsDTO errorDetailsDTO = new ErrorDetailsDTO(e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDetailsDTO);
    }

}
