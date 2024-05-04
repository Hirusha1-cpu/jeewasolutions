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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity // apply as an entity class
@Table(name = "sales") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Invoice {
    
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

     @Column(name = "invoiceno")
    private String invoiceno;
   
    @ManyToOne(optional = false)
    @JoinColumn(name="customer_id", referencedColumnName = "id")
    private Customer customer_id;
    
    @Column(name = "paymentmethod")
    private String paymentmethod;
    
    @Column(name = "referenceno")
    private String referenceno;
    
    @Column(name = "total")
    private String total;
    
    @Column(name = "balance")
    private String balance;
    
    @Column(name = "customerpaidamount")
    private String customerpaidamount;
    
    // @JsonIgnoreProperties(value = {"sales_id"})
    @OneToMany(mappedBy = "sales_id", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SalesHasSerial> salesHasSerials;
    
    @OneToMany(mappedBy = "sales_id", cascade = CascadeType.ALL)
    // @JoinColumn(name="serialnolist_id", referencedColumnName = "id")
    @JsonIgnore
    private List<SerialNoList> serialnolist_id;
    
}
