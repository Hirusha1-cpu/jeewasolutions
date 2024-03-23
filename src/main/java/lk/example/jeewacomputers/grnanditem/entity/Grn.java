package lk.example.jeewacomputers.grnanditem.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
    private Purchase purchase_id ;

    @Column(name = "added_datetime")
    // @NotNull
    private LocalDate added_datetime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "addeduser_id", referencedColumnName = "id")
    // @NotNull
    private User addeduser_id ;

    @Column(name = "discount")
    // @NotNull
    private String discount;

    @Column(name = "qty")
    // @NotNull
    private Integer qty;

    @Column(name = "item_price")
    // @NotNull
    private Integer item_price;

    @Column(name = "paid_status")
    // @NotNull
    private String paid_status;


}
