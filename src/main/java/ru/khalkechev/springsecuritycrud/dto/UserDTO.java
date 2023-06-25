package ru.khalkechev.springsecuritycrud.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private Long id;

    @NotEmpty(message = "Поле `E-mail` не должно быть пустым")
    @Email(message = "E-mail должен быть валидным")
    private String name;

    @NotEmpty(message = "Поле `Пароль` не должно быть пустым")
    @Size(min = 3, message = "Пароль должен содержать не менее 3 символов")
    private String password;

    @NotEmpty(message = "Поле `Имя пользователя` не должно быть пустым")
    @Size(min = 2, max = 20, message = "Имя должно содержать не менее 2 символов и не более 20")
    private String firstName;

    @NotEmpty(message = "Поле `Фамилия` не должно быть пустым")
    @Size(min = 2, max = 20, message = "Фамилия должна содержать не менее 2 символов и не более 20")
    private String surname;

    @Min(value = 18, message = "Возраст не должен быть менее 18 лет ")
    private byte age;

    @NotEmpty(message = "Должна быть выбрана хотя бы одна роль")
    private List<String> roles = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public byte getAge() {
        return age;
    }

    public void setAge(byte age) {
        this.age = age;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
