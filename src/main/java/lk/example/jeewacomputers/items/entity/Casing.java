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
@Table(name = "casing")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Casing {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "dimentions")
    private String dimentions;

    @Column(name = "motherboardcapability")
    private String motherboardcapability;

    @Column(name = "weight")
    private String weight;

    @Column(name = "material")
    private String material;

    @Column(name = "ioports")
    private String ioports;

    @Column(name = "slots")
    private String slots;

    @Column(name = "maxgpulength")
    private String maxgpulength;

    @Column(name = "radiator")
    private String radiator;

    @Column(name = "color")
    private String color;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "added_datetime")
    @NotNull
    private LocalDate added_datetime;

    @Column(name = "deleted_datetime")
    private LocalDate deleted_datetime;

    @Column(name = "updated_datetime")
    private LocalDate updated_datetime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "added_user_id", referencedColumnName = "id")
    private User added_user_id;

    @Column(name = "deleted_user")
    private Integer deleted_user;

    @Column(name = "updated_user")
    private Integer updated_user;

    @Column(name = "max_discounted_ratio")
    @NotNull
    private BigDecimal max_discounted_ratio;

    @Column(name = "min_discounted_ratio")
    @NotNull
    private BigDecimal min_discounted_ratio;

    @Column(name = "sales_price")
    @NotNull
    private BigDecimal sales_price;

    @Column(name = "purchase_price")
    @NotNull
    private BigDecimal purchase_price;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand_id;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category_id;

    @ManyToOne
    @JoinColumn(name = "pc_part_status_id", referencedColumnName = "id")
    private PcPartStatus pc_part_status_id;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "reorder_point")
    private Integer reorder_point;

    @Column(name = "warrenty")
    private Integer warrenty;



}
