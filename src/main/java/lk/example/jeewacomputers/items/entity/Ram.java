package lk.example.jeewacomputers.items.entity;

import java.math.BigDecimal;
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
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Brand;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.PcPartStatus;
import lk.example.jeewacomputers.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ram")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ram {
         @Id
    @Column(name = "id")
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "ddr")
    private String ddr;

    @Column(name = "capacity")
    private String capacity;

      @Column(name = "warrenty")
    @NotNull
    private Integer warrenty;

    @Column(name = "added_datetime")
    @NotNull
    private LocalDate added_datetime;

    @Column(name = "deleted_datetime")
    private LocalDate deleted_datetime;

    @Column(name = "updated_datetime")
    private LocalDate updated_datetime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "added_user_id", referencedColumnName = "id")
    private User added_user_id ;

    @Column(name = "deleted_user")
    private Integer deleted_user;

    @Column(name = "updated_user")
    private Integer updated_user;

    @Column(name = "max_discount_ratio")
    private BigDecimal max_discount_ratio;

    @Column(name = "min_discount_ratio")
    private BigDecimal min_discount_ratio;

    @Column(name = "sales_rate")
    @NotNull
    private BigDecimal sales_rate;

    @Column(name = "purchase_price")
    @NotNull
    private BigDecimal purchase_price;

    @Column(name = "reorder_point")
    private Integer reorder_point;

     @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand_id ;

     @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category_id ;

     @ManyToOne
    @JoinColumn(name = "pc_part_status_id", referencedColumnName = "id")
    private PcPartStatus pc_part_status_id ;

    @Column(name = "speed")
    private String speed;

    @Column(name = "qty")
    private Integer qty;

}
