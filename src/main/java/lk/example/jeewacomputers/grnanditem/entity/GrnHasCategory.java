package lk.example.jeewacomputers.grnanditem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "grn_has_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrnHasCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NotNull
    @Column(name = "id", unique = true)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "grn_id", referencedColumnName = "id")
    // @NotNull
    private Grn grn_id ;

     @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    // @NotNull
    private Category category_id ;

    @Column(name = "itemname")
    // @NotNull
    private String itemname;

    @Column(name = "item_price")
    // @NotNull
    private Integer item_price;

    @Column(name = "qty")
    // @NotNull
    private Integer qty;

    @Column(name = "lineprice")
    // @NotNull
    private Integer lineprice;
    
    @Column(name = "discount")
    // @NotNull
    private Integer discount;

    @Column(name = "itemcode")
    // @NotNull
    private String itemcode;

    @ManyToOne(optional = false)
    @JoinColumn(name = "availableitems_id", referencedColumnName = "id")
    // @NotNull
    private AvailableItems availableitems_id ;
}
