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
@Table(name = "grn_item_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrnItemStatus {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NotNull
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "grnstatus")
    // @NotNull
    private String grnstatus;
}
