package lk.example.jeewacomputers.user.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.example.jeewacomputers.employee.entity.Employee;
import lk.example.jeewacomputers.privilege.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "user") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class User {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull
    private Integer id;

    @Column(name ="username")
    @NotNull
    private String username;

    @Column(name ="password")
    @NotNull
    private String password;

    @Column(name ="email")
    @NotNull
    private String email;

    @Column(name ="photopath")
    @NotNull
    private String photopath;

    @Column(name ="status")
    @NotNull
    private String status;

    @Column(name ="added_datetime")
    @NotNull
    private LocalDateTime added_datetime;

    @Column(name ="note")
    // @NotNull
    private String note;

    @ManyToOne
    @JoinColumn(name="employee_id", referencedColumnName="id")
    private Employee employee;

        //user and 
    // @ManyToMany(cascade = CascadeType.MERGE)
    // @JoinTable(name = "user_has_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    // private Set<Role> roles;



}
