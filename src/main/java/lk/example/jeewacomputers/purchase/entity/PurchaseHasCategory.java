package lk.example.jeewacomputers.purchase.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;
// import lk.example.jeewacomputers.employee.entity.Designation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "purchase_has_category") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class PurchaseHasCategory {
    @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "purchase_id", referencedColumnName = "id")
    @JsonIgnore
    private Purchase purchase_id ;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category_id ;

    @Column(name = "itemname")
    private String itemname;

    @Column(name = "itemcode")
    private String itemcode;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "itemprice")
    private Integer itemprice;

    @Column(name = "lineprice")
    private Integer lineprice;
}
