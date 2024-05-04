package lk.example.jeewacomputers.grnanditem.entity;

import java.time.LocalDate;
import java.util.*;

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
// import jakarta.validation.constraints.NotNull;
import lk.example.jeewacomputers.purchase.entity.Purchase;

import lk.example.jeewacomputers.user.entity.User;
// import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "grn")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Grn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NotNull
    @Column(name = "id", unique = true)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "purchase_id", referencedColumnName = "id")
    // @NotNull
    // @JsonIgnore
    private Purchase purchase_id ;

    @Column(name = "added_datetime")
    // @NotNull
    private LocalDate added_datetime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "addeduser_id", referencedColumnName = "id")
    // @NotNull
    private User addeduser_id ;

    @ManyToOne(optional = false)
    @JoinColumn(name = "grn_item_status_id" , referencedColumnName = "id")
    private GrnItemStatus grnItemStatus;

    @Column(name = "grnno")
    // @NotNull
    private String grnno;

    @Column(name = "supplierinvoiceno")
    // @NotNull
    private String supplierinvoiceno;

    @Column(name = "receiveddate")
    // @NotNull
    private LocalDate receiveddate;

    @Column(name = "totalamount")
    // @NotNull
    private Integer totalamount;

    @Column(name = "discountrate")
    // @NotNull
    private Integer discountrate;

    @Column(name = "netamount")
    // @NotNull
    private Integer netamount;

    @JsonIgnoreProperties(value = {"grn_id"})
    @OneToMany(mappedBy = "grn_id", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    private List<GrnHasCategory> grnHasCategory;
      
    
}
