package lk.example.jeewacomputers.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lk.example.jeewacomputers.user.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {

    // //create query for get user by given username
    // @Query(value = "SELECT * FROM jeewacomputersproject.user WHERE username =
    // ?1", nativeQuery = true)
    // public User getUserByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User getUserByUsername(@Param("username") String username);

    // //create query for get user by given employee
    // @Query(value = "SELECT * FROM jeewacomputersproject.user as u where
    // u.employee_id.id = ?1", nativeQuery = true)

    @Query("SELECT u FROM User u JOIN u.employee e WHERE e.id = :id")   
     public User getUserByEmployeeId(@Param("id") Integer id);

}