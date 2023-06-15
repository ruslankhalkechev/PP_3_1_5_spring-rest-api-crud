package ru.khalkechev.springsecuritycrud.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.khalkechev.springsecuritycrud.dao.UserDAO;
import ru.khalkechev.springsecuritycrud.model.Role;
import ru.khalkechev.springsecuritycrud.model.User;
import ru.khalkechev.springsecuritycrud.service.UserService;

@Component
public class AddInitialDataCommandLineRunnerImpl implements CommandLineRunner {
    private final UserDAO userDAO;
    private final UserService userService;

    @Autowired
    public AddInitialDataCommandLineRunnerImpl(UserService userService, UserDAO userDAO) {
        this.userService = userService;
        this.userDAO = userDAO;
    }

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        Role role1 = new Role("ADMIN");
        Role role2 = new Role("USER");
        User user1 = new User("admin@mail.ru",
                "$2a$12$Q81dORnfaZ/Agu./ZxiDw.k1ekO1NXMJsE1gHnK1uXXe.mhzqOS3q",
                "Иван", "Петров", (byte) 18);
        user1.addRole(role1);
        user1.addRole(role2);
        userService.save(user1);

        User user2 = new User("list@list.ru",
                "$2a$12$Q81dORnfaZ/Agu./ZxiDw.k1ekO1NXMJsE1gHnK1uXXe.mhzqOS3q",
                "Admin", "Admin", (byte) 38);
        user2.addRole(role1);
        userService.save(user2);

        User user3 = new User("user@mail.ru",
                "$2a$12$Q81dORnfaZ/Agu./ZxiDw.k1ekO1NXMJsE1gHnK1uXXe.mhzqOS3q",
                "User", "User", (byte) 20);
        user3.addRole(role2);
        userService.save(user3);
    }
}
