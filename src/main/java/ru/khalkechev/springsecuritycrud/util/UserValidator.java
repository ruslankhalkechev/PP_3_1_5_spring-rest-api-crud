package ru.khalkechev.springsecuritycrud.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.khalkechev.springsecuritycrud.model.User;
import ru.khalkechev.springsecuritycrud.service.UserService;

@Component
public class UserValidator implements Validator {
    private final UserService userService;

    @Autowired
    public UserValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        if (userService.findByUserName(user.getName()) != null) {
            errors.rejectValue("name", "", "Такой логин уже существует");
        }
    }
}
