package lk.example.jeewacomputers.sales.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    // @JsonIgnoreProperties(value = {"sales_id"})
    private Invoice sales_id ;

    @ManyToOne
    @JoinColumn(name = "serialno_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"serialno_id"})
    private SerialNo serialno_id ;

    @Column(name = "warrentystartdate")
    private LocalDateTime warrentystartdate;

    @Column(name = "warrentyperiod")
    private Integer warrentyperiod;

    @Column(name = "warrentyexpire")
    private LocalDateTime warrentyexpire;


}
