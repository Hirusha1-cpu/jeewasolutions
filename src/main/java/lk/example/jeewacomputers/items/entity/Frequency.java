package lk.example.jeewacomputers.items.entity;

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
@Table(name = "frequency") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Frequency {
       @Id // for pk
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    @Column(name = "id ", unique = true) // for map with column name
    private Integer id;

    @Column(name = "frequency")
    @NotNull
    private String frequency;     
}
