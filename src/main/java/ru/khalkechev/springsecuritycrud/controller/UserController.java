package ru.khalkechev.springsecuritycrud.controller;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.khalkechev.springsecuritycrud.dto.UserDTO;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotCreatedOrUpdatedException;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotFoundException;
import ru.khalkechev.springsecuritycrud.model.User;
import ru.khalkechev.springsecuritycrud.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder,
                          ModelMapper modelMapper) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<UserDTO>> showList() {
        List<UserDTO> usersDTO = userService.getListOfUsers()
                .stream()
                .map(this::convertToUserDTO)
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK)
                .body(usersDTO);
    }

    @PostMapping("/admin")
    public ResponseEntity<UserDTO> create(@RequestBody @Valid UserDTO userDTO, Errors errors) {
        User user = convertToUser(userDTO);
        userService.validate(user, errors);
        if (errors.hasErrors()) {
            throw new UserNotCreatedOrUpdatedException("Ошибка в данных при создании пользователя", errors);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userDTO);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<UserDTO> update(@RequestBody @Valid UserDTO userDTO, Errors errors,
                                          @PathVariable("id") long id) {
        User user = convertToUser(userDTO);
        User updatedUser = userService.getUserById(id);
        if (!updatedUser.getName().equals(user.getName())) {
            userService.validate(user, errors);
        }

        if (errors.hasErrors()) {
            throw new UserNotCreatedOrUpdatedException("Ошибка в данных при обновлении пользователя", errors);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.updateById(user, id);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(userDTO);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUserInfo(Principal principal) {
        Optional<User> optionalUser = userService.findByUserName(principal.getName());
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException("Пользователь - " + principal.getName() + " - не найден");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(convertToUserDTO(optionalUser.get()));
    }


    private User convertToUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setRoles(userDTO.getRoles()
                .stream()
                .map(userService::convert)
                .collect(Collectors.toSet()));
        return user;
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setPassword("");
        userDTO.setRoles(userDTO.getRoles()
                .stream()
                .map(n -> n.contains("ADMIN") ? "ADMIN" : "USER")
                .collect(Collectors.toList()));
        return userDTO;
    }

}
