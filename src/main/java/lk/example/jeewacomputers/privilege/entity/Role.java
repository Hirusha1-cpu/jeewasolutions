package lk.example.jeewacomputers.privilege.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "role") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Role {
    
     @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    @NotNull 
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;
}
