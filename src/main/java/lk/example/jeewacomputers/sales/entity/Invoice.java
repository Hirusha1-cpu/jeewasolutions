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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.customer.entity.Customer;
import lk.example.jeewacomputers.payment.entity.IncomePayment;
import lk.example.jeewacomputers.repair.entity.DuetoRepair;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import java.math.BigDecimal;
import java.util.*;

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

    @ManyToOne(optional = true)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer_id;

    @Column(name = "paymentmethod")
    private String paymentmethod;

    @Column(name = "referenceno")
    private String referenceno;

    @Column(name = "datetime")
    private LocalDate datetime;

    @Column(name = "total")
    private BigDecimal total;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "customerpaidamount")
    private BigDecimal customerpaidamount;

    @JsonIgnoreProperties(value = {"sales_id"})
    @OneToMany(mappedBy = "sales_id", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    private List<SalesHasSerial> salesHasSerials;

    @JsonIgnoreProperties(value = {"sales_id"})
    @OneToMany(mappedBy = "sales_id", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    private List<SalesHasDue> salesHasDues;

    @JsonIgnoreProperties(value = { "sales_id" })
    @OneToOne(mappedBy = "sales_id", cascade = CascadeType.ALL, orphanRemoval = true, optional = true)
    private IncomePayment incomePayments;

    //  @ManyToOne
    // @JoinColumn(name = "due_to_repairitem_id", referencedColumnName = "id")
    // // @JsonIgnoreProperties(value = {"sales_id"})
    // private DuetoRepair due_to_repairitem_id ;

    // @JsonIgnoreProperties(value = {"sales_id"})
    // @OneToMany(mappedBy = "sales_id", cascade = CascadeType.ALL, orphanRemoval =
    // true)
    // // @JoinColumn(name="serialnolist_id", referencedColumnName = "id")
    // // @JsonIgnore
    // private List<SerialNoList> serialnolist_id;

}
