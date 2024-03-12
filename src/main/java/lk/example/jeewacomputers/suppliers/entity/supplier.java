package lk.example.jeewacomputers.suppliers.entity;

import jakarta.persistence.Entity;
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
public class Supplier {
       @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Brand brand_id;

    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category_id;   


}
