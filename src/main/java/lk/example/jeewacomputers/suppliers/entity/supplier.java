package lk.example.jeewacomputers.suppliers.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.example.jeewacomputers.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Entity // apply as an entity class
@Table(name = "supplier") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Supplier {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "supplier_code")
    private String supplier_code;

    @Column(name = "contactnumber")
    private String contactnumber;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    // @NotNull
    private User user_id ;

    @ManyToOne(optional = false)
    @JoinColumn(name = "supplierstatus_id", referencedColumnName = "id")
    private SupplierStatus supplierstatus_id ;

    @OneToMany(mappedBy = "supplier_id")
    private List<SupplierHasCategory> categoriesBrandsWithSuppliers;

    @OneToMany(mappedBy = "supplier_id")
    private List<SupplierBankDetails> bankDetailsOfSuppliers;

    @Column(name = "email")
    private String email;

}
