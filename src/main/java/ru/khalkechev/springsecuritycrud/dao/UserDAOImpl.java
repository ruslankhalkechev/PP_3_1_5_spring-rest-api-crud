package ru.khalkechev.springsecuritycrud.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import ru.khalkechev.springsecuritycrud.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDAOImpl implements UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User save(User user) {
        entityManager.persist(user);
        return user;
    }

    @Override
    public void delete(User user) {
        entityManager.remove(user);
    }

    @Override
    public User update(User user) {
        entityManager.merge(user);
        return user;
    }

    @Override
    public Optional<User> getUserById(long id) {
        return Optional.ofNullable(entityManager.find(User.class, id));
    }

    @Override
    public List<User> getListOfUsers() {
        return entityManager.createQuery("FROM User user ORDER BY user.id", User.class).getResultList();
    }

    @Override
    public Optional<User> findByUserName(String username) {
        return entityManager
                .createQuery("SELECT u FROM User u JOIN FETCH u.roles WHERE u.name = :parameterNameOfUser")
                .setParameter("parameterNameOfUser", username)
                .getResultList()
                .stream()
                .findFirst();
    }
}
