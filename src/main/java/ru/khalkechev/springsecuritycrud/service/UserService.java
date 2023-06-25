package ru.khalkechev.springsecuritycrud.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.Errors;
import ru.khalkechev.springsecuritycrud.model.Role;
import ru.khalkechev.springsecuritycrud.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService extends UserDetailsService {
    User save(User user);

    void deleteUserById(long id);

    User updateById(User user, long id);

    User getUserById(long id);

    List<User> getListOfUsers();

    Set<Role> getSetOfRoles();

    Optional<User> findByUserName(String username);

    void validate(User user, Errors errors);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    Role convert(String name);

}
