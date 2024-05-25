package lk.example.jeewacomputers.grnanditem.entity;

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

@Entity
@Table(name = "grn_has_accessories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrnHasAccessories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "unitprice")
    // @NotNull
    private Integer unitprice;

    @Column(name = "qty")
    // @NotNull
    private Integer qty;

    @Column(name = "lineprice")
    // @NotNull
    private Integer lineprice;

    @ManyToOne(optional = true)
    @JoinColumn(name = "grn_id" , referencedColumnName = "id")
    private Grn grn_id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "accessories_id" , referencedColumnName = "id")
    private Accessories accessories;
}
