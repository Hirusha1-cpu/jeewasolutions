package lk.example.jeewacomputers.customer.entity;
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
@Table(name = "customer") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Customer {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

     @Column(name = "customercode")
    private String customercode;

     @Column(name = "name")
    private String name;

     @Column(name = "phone")
    private String phone;

     @Column(name = "buyrounds")
    private Integer buyrounds;

     @Column(name = "buymode")
    private String buymode;

     @Column(name = "repairs")
    private Integer repairs;


    @ManyToOne(optional = true)
    @JoinColumn(name="customertype_id", referencedColumnName = "id")
    private CustomerType customerType;
}
