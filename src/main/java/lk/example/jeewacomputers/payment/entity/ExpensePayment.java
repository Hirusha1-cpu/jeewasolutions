package lk.example.jeewacomputers.payment.entity;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.grnanditem.entity.Grn;
import lk.example.jeewacomputers.sales.entity.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpensePayment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "grnpayment")
    private Integer grnpayment;

    @Column(name = "grnpayemntdate")
    private LocalDate grnpayemntdate;

    @Column(name = "grnno")
    private String grnno;

    @OneToOne
    @JoinColumn(name = "grn_id", referencedColumnName = "id")
    // @JsonIgnoreProperties(value = {"sales_id"})
    private Grn grn_id ;



}
