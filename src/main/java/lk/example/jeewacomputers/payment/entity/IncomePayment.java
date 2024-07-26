package lk.example.jeewacomputers.payment.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lk.example.jeewacomputers.repair.entity.Repair;
import lk.example.jeewacomputers.sales.entity.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "incomepayment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncomePayment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "payment")
    private Integer payment;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "invoiceno")
    private String invoiceno;

    @OneToOne(optional = true)
    @JoinColumn(name = "sales_id", referencedColumnName = "id")
    @JsonIgnore
    // @JsonIgnoreProperties(value = {"sales_id"})
    private Invoice sales_id ;

    @OneToOne(optional = true)
    @JoinColumn(name = "repair_id", referencedColumnName = "id")
    @JsonIgnore
    // @JsonIgnoreProperties(value = {"repair_id"})
    private Repair repair_id ;

}
