package lk.example.jeewacomputers.grnanditem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "availableitems")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvailableItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NotNull
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "itemname")
    // @NotNull
    private String itemname;

    @Column(name = "item_price")
    // @NotNull
    private Integer item_price;

    @Column(name = "itemcode")
    // @NotNull
    private String itemcode;

    @Column(name = "serialno")
    // @NotNull
    private String serialno;

  
}
