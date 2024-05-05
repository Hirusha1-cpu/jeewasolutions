package lk.example.jeewacomputers.sales.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "serialnolist") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class SerialNoList {

    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull
    private Integer id;

    @Column(name = "serialno")
    private String serialno;

    @ManyToOne
    @JoinColumn(name = "sales_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"sales_id"})
    // @JsonIgnore
    private Invoice sales_id ;

    @Column(name = "warrentyperiod")
    private Integer warrentyperiod;

}
