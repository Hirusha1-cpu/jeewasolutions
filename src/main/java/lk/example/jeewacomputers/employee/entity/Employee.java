package lk.example.jeewacomputers.employee.entity;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "employee") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Employee {
        @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

    @Column(name = "empno", unique = true)
    @NotNull
    @Length(max = 8)
    private String empno;

    @Column(name = "fullname")
    @NotNull
    private String fullname;

    @Column(name = "callingname")
    @NotNull
    private String callingname;

    @Column(name = "nic", unique = true)
    @NotNull
    @Length(max = 12, min = 10)
    private String nic;

    @Column(name = "email", unique = true)
    @NotNull
    private String email;

    @Column(name = "mobile")
    @NotNull
    @Length(max = 10)
    private String mobile;

    @Column(name = "landno")
    @Length(max = 10)
    private String landno;


    @Column(name = "address")
    @NotNull
    private String address;

    @Column(name = "note")
    private String note;

    @Column(name = "gender")
    @NotNull
    private String gender;

    @Column(name = "civilstatus")
    @NotNull
    private String civilstatus;

    @Column(name = "dateofbirth")
    @NotNull
    private LocalDate dateofbirth;

    @Column(name = "addeddatetime")
    @NotNull
    private LocalDate addeddatetime;

    @Column(name = "lastmodifydate")
    private LocalDate lastmodifydatetime;

    @Column(name = "deleteddatetime")
    private LocalDate deletedatetime;

    @ManyToOne // relationship format
    @JoinColumn(name = "employeestatus_id", referencedColumnName = "id") //join column condition
    private EmployeeStatus employeestatus_id ;

    @ManyToOne
    @JoinColumn(name = "designation_id", referencedColumnName = "id")
    private Designation designation_id ;

    // @Column(name ="deletestatus")
    // @NotNull
    // private Boolean deletestatus;
}
