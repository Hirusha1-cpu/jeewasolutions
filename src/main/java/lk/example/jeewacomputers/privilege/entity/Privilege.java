package lk.example.jeewacomputers.privilege.entity;

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
@Table(name = "privilege") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Privilege {

    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

    @Column(name = "sel")
    @NotNull
    private Boolean sel;

    @Column(name = "del")
    @NotNull
    private Boolean del;

    @Column(name = "inst")
    @NotNull
    private Boolean inst;

    @Column(name = "upd")
    @NotNull
    private Boolean upd;

    @ManyToOne
    @JoinColumn(name = "module_id", referencedColumnName = "id")
    private Module module_id;


    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role_id;




    
}
