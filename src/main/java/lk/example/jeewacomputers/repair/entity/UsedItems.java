package lk.example.jeewacomputers.repair.entity;
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
import java.math.BigDecimal;

@Entity // apply as an entity class
@Table(name = "useditems") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class UsedItems {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

     @Column(name = "serialno")
    private String serialno;

     @Column(name = "itemcode")
    private String itemcode;

     @Column(name = "itemname")
    private String itemname;

     @Column(name = "category")
    private String category;

     @Column(name = "unitprice")
    private BigDecimal unitprice;

    @ManyToOne(optional = true)
    @JoinColumn(name = "due_to_repairitem_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"serialno_id"})
    private DuetoRepair due_to_repairitem_id;
}
