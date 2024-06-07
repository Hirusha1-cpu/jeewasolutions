package lk.example.jeewacomputers.grnanditem.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;
import lk.example.jeewacomputers.sales.entity.SalesHasSerial;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "serialno")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerialNo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NotNull
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "serialno")
    // @NotNull
    private String serialno;

    @ManyToOne(optional = true)
    @JoinColumn(name = "grn_has_category_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"grn_id"})
    @JsonIgnore
    // @NotNull
    private GrnHasCategory grn_has_category_id ;

    @Column(name = "itemname")
    // @NotNull
    private String itemname;
    
    @Column(name = "itemcode")
    // @NotNull
    private String itemcode;

    @Column(name = "itemprice")
    // @NotNull
    private Integer itemprice;
    
    @Column(name = "availability")
    // @NotNull
    private Boolean availability;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    // @JsonIgnore
    // @NotNull
    private Category category_id ;

    // @JsonIgnoreProperties(value = {"serialno_id"})
    // @OneToMany(mappedBy = "serialno_id", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    // private List<SalesHasSerial> salesHasSerials;

    // public SerialNo(String serialno, String itemname, Category category_id) {
    //     this.serialno = serialno;
    //     this.itemname = itemname;
    //     this.category_id = category_id;
    // }



 
}
