package ru.khalkechev.springsecuritycrud.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import ru.khalkechev.springsecuritycrud.dao.RoleDAO;
import ru.khalkechev.springsecuritycrud.dao.UserDAO;
import ru.khalkechev.springsecuritycrud.exceptions.UserNotFoundException;
import ru.khalkechev.springsecuritycrud.model.Role;
import ru.khalkechev.springsecuritycrud.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserDAO userDAO;
    private final RoleDAO roleDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, RoleDAO roleDAO) {
        this.userDAO = userDAO;
        this.roleDAO = roleDAO;
    }


    @Override
    @Transactional
    public User save(User user) {
        userDAO.save(user);
        return user;
    }

    @Override
    @Transactional
    public void deleteUserById(long id) {
        User user = getUserById(id);
        userDAO.delete(user);
    }

    @Override
    @Transactional
    public User updateById(User updatedUser, long id) {
        User userToBeUpdated = getUserById(id);

        userToBeUpdated.setName(updatedUser.getName());
        userToBeUpdated.setPassword(updatedUser.getPassword());
        userToBeUpdated.setFirstName(updatedUser.getFirstName());
        userToBeUpdated.setSurname(updatedUser.getSurname());
        userToBeUpdated.setAge(updatedUser.getAge());
        userToBeUpdated.setRoles(updatedUser.getRoles());

        userDAO.update(userToBeUpdated);
        return userToBeUpdated;
    }

    @Override
    public User getUserById(long id) throws UserNotFoundException {
        return userDAO.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException("Пользователь c id=" + id + " - не найден"));
    }

    @Override
    public List<User> getListOfUsers() {
        return userDAO.getListOfUsers();
    }

    @Override
    public Set<Role> getSetOfRoles() {
        return roleDAO.getSetOfRoles();
    }

    @Override
    public Optional<User> findByUserName(String username) {
        return userDAO.findByUserName(username);
    }

    @Override
    public void validate(User user, Errors errors) {
        if (findByUserName(user.getName()).isPresent()) {
            errors.rejectValue("name", "", "Такой логин уже существует");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = findByUserName(username);
        return user.orElseThrow(() -> new UsernameNotFoundException("Пользователь -" + username + "- не найден"));
    }

    @Override
    public Role convert(String name) {
        return roleDAO.getRoleByName(name);
    }

}