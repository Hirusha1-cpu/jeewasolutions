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

    @ManyToOne(optional = false)
    @JoinColumn(name = "grn_has_category_id", referencedColumnName = "id")
    // @JsonIgnore
    // @NotNull
    private GrnHasCategory grn_has_category_id ;

 
}
