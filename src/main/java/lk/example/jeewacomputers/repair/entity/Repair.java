package lk.example.jeewacomputers.repair.entity;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Entity // apply as an entity class
@Table(name = "repair") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Repair {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

     @Column(name = "repairno")
    private String repairno;

     @Column(name = "repairstatus")
    private String repairstatus;

    @JsonIgnoreProperties(value = {"repair_id"})
    @OneToMany(mappedBy = "repair_id", cascade = CascadeType.ALL)
    // @JsonIgnore
    private List<DuetoRepair> duetoRepair;

    @ManyToOne(optional = true)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"serialno_id"})
    private Customer customer_id ;

    @JsonIgnoreProperties(value = {"repair_id"})
    @OneToOne(mappedBy = "repair_id", cascade = CascadeType.ALL, orphanRemoval = true, optional = true)
    // @JsonIgnore
    private IncomePayment incomePayments;
    
}
