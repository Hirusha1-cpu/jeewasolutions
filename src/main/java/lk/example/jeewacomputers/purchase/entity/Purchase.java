package lk.example.jeewacomputers.purchase.entity;

import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.NotNull;
import lk.example.jeewacomputers.suppliers.entity.Supplier;
import lk.example.jeewacomputers.suppliers.entity.SupplierBankDetails;
import lk.example.jeewacomputers.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "purchase") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Purchase {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

     @Column(name = "purchase_code")
    private String purchase_code;

    @Column(name = "added_datetime")
    private LocalDate added_datetime;

    @Column(name = "updated_datetime")
    private LocalDate updated_datetime;

    @Column(name = "deleted_datetime")
    private LocalDate deleted_datetime;

    @Column(name = "note")
    private String note;

    @Column(name = "required_datetime")
    private LocalDate required_datetime;

    @ManyToOne(optional = false)
    @JoinColumn(name="purchasestatus_id", referencedColumnName = "id")
    private PurchaseStatus purchasestatus_id;

    @JsonIgnoreProperties(value = {"contactnumber","user_id","supplier_code","supplierstatus_id","categoriesBrandsWithSuppliers","bankDetailsOfSuppliers","email"})
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name="supplier_id", referencedColumnName = "id")
    // @JsonIgnore
    private Supplier supplier_id;

    @ManyToOne
    @JoinColumn(name="addeduser_id", referencedColumnName = "id")
    private User addeduser_id;

    @OneToMany(mappedBy = "purchase_id", cascade = CascadeType.ALL)
    private List<PurchaseHasCategory> purchaseHasCategory;



}
