package lk.example.jeewacomputers.report.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class ReportCategoryViseCountWeek {
    private String categoryname;
    private String itemcount;
    private String week_start;
    private String week_end;

}
