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
@Table(name = "accessories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accessories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "itemcode")
    // @NotNull
    private String itemcode;

    @Column(name = "itemname")
    // @NotNull
    private String itemname;

    @Column(name = "itemtype")
    // @NotNull
    private String itemtype;

    @Column(name = "suppliername")
    // @NotNull
    private String suppliername;

    @Column(name = "suppliercontact")
    // @NotNull
    private String suppliercontact;
}
