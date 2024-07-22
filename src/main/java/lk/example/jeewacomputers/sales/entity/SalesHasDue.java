package lk.example.jeewacomputers.sales.entity;
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
import lk.example.jeewacomputers.repair.entity.DuetoRepair;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity // apply as an entity class
@Table(name = "sales_has_due_to_repairitem") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class SalesHasDue {
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
    @JoinColumn(name = "due_to_repairitem_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"sales_id"})
    private DuetoRepair due_to_repairitem_id ;

    @Column(name = "statusofserviceorrepair")
    private String statusofserviceorrepair;
}
