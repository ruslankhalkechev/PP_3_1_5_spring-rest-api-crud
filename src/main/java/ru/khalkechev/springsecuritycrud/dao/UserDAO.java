package ru.khalkechev.springsecuritycrud.dao;

import ru.khalkechev.springsecuritycrud.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDAO {
    User save(User user);

    void delete(User user);

    User update(User user);

    Optional<User> getUserById(long id);

    List<User> getListOfUsers();

    Optional<User> findByUserName(String username);
}
