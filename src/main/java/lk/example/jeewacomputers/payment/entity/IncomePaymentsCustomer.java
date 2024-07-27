package lk.example.jeewacomputers.payment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class IncomePaymentsCustomer {
    
    private String invoiceno;
    private String date;
    private String customer;
    private String Total;
}
