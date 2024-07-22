package lk.example.jeewacomputers.report.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class ReportCategoryViseCount {

    private String categoryname;
    private String itemcount;

}
