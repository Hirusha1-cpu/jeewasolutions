package lk.example.jeewacomputers.repair.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.math.BigDecimal;
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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Entity // apply as an entity class
@Table(name = "due_to_repairitem") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class DuetoRepair {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

     @Column(name = "serialno")
    private String serialno;

     @Column(name = "itemname")
    private String itemname;

     @Column(name = "category")
    private String category;

     @Column(name = "total")
    private BigDecimal total;

     @Column(name = "charges")
    private BigDecimal charges;

     @Column(name = "statusofrepair")
    private String statusofrepair;

     @Column(name = "repairtype")
    private String repairtype;

     @Column(name = "fault")
    private String fault;

     @Column(name = "barcodeforrepair")
    private String barcode;

    @Column(name = "technicalnote")
    private String technicalnote;

    @Column(name = "repairid")
    private Integer repairid;

    @Column(name = "takendate")
    private LocalDate takendate;

    @ManyToOne
    @JoinColumn(name = "repair_id", referencedColumnName = "id")
   @JsonIgnore
    private Repair repair_id ;

    // @OneToMany(mappedBy = "due_to_repairitem_id", cascade = CascadeType.ALL,orphanRemoval = true)
    // // @JsonIgnore
    // private List<UsedItems> usedItems;

    @JsonIgnoreProperties(value = {"due_to_repairitem_id"})
    @OneToMany(mappedBy = "due_to_repairitem_id", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    private List<UsedItems> usedItems;

    


}
