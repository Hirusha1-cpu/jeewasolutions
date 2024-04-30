package lk.example.jeewacomputers.sales.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity // apply as an entity class
@Table(name = "sales_has_serialno") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class SalesHasSerial {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sales_id", referencedColumnName = "id")
    // @JsonIgnore
    private Invoice sales_id ;

    @ManyToOne
    @JoinColumn(name = "serialno_id", referencedColumnName = "id")
    // @JsonIgnore
    private SerialNo serialno_id ;

    @Column(name = "warrentystartdate")
    private String warrentystartdate;

    @Column(name = "warrentyperiod")
    private String warrentyperiod;

    @Column(name = "warrentyexpire")
    private String warrentyexpire;


}
