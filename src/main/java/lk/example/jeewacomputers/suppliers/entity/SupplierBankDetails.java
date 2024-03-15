package lk.example.jeewacomputers.suppliers.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "supplierbankdetails") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class SupplierBankDetails {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "id ", unique = true) // for map with column name
    @NotNull
    private Integer id;

    @Column(name = "bankname")
    private String bankname;

    @Column(name = "branchname")
    private String branchname;

    @Column(name = "accno")
    private String accno;

    @Column(name = "accholdername")
    private String accholdername;

    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    @NotNull
    @JsonIgnore
    private Supplier supplier_id;

}
