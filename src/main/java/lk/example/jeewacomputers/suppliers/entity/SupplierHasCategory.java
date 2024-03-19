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
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Brand;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "supplier_has_category")
@NoArgsConstructor
@AllArgsConstructor
public class SupplierHasCategory {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull
    private Integer id;

    
    @ManyToOne(optional = false)
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    // @NotNull
    private Brand brand_id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    // @NotNull
    private Category category_id;

 
    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    // @NotNull
      @JsonIgnore
    private Supplier supplier_id;

}
