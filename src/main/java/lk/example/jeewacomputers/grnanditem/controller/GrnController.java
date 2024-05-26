package lk.example.jeewacomputers.grnanditem.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import jakarta.transaction.Transactional;
import lk.example.jeewacomputers.categorypcpartandbrand.dao.CategoryDao;
import lk.example.jeewacomputers.categorypcpartandbrand.entity.Category;
import lk.example.jeewacomputers.grnanditem.dao.AccessoriesDao;
import lk.example.jeewacomputers.grnanditem.dao.GrnDao;
import lk.example.jeewacomputers.grnanditem.dao.SerialNoDao;
import lk.example.jeewacomputers.grnanditem.entity.Accessories;
import lk.example.jeewacomputers.grnanditem.entity.Grn;
import lk.example.jeewacomputers.grnanditem.entity.GrnHasAccessories;
import lk.example.jeewacomputers.grnanditem.entity.GrnHasCategory;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;
import lk.example.jeewacomputers.service.BarCodeGenerator;

@RestController
// @EnableTransactionManagement
public class GrnController {
    @Autowired
    // create dao object
    private GrnDao dao;

    @Autowired
    private AccessoriesDao accessoriesDao;

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private SerialNoDao serialNoDao;

    private Category category;

    @Autowired
    private BarCodeGenerator barcodeGenerator; // Inject the BarcodeGenerator service

    @GetMapping(value = "/grn/getlist", produces = "application/json")
    public List<Grn> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @GetMapping(value = "/grn/getlist/{purchase_id}", produces = "application/json")
    public Grn findGrnAll(@PathVariable("purchase_id") Integer purchase_id) {
        // login user authentication and authorization
        return dao.getPurchaseOrdersWithCode(purchase_id);
    }

    @GetMapping(value = "/grn/getlists/{id}", produces = "application/json")
    public Grn findGrn(@PathVariable("id") Integer id) {
        // login user authentication and authorization
        return dao.getGrnIdByPurchaseId(id);
    }

    // model eka pennwa
    @RequestMapping(value = "/grn")
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth);
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("modulename", "GRN");
        viewEmp.addObject("title", "GRN Management - BIT Project 2024");
        viewEmp.setViewName("grn/grn.html");
        return viewEmp;
    }

    @PostMapping(value = "/grn")
    // @Transactional
    public String save(@RequestBody Grn grn) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // serila no list eka grnhascategory eka atulen awama for loop ehekin nested
        // widta pass kranwa
        try {
            // if (grn.getGrnHasAccessories() != null) {

            // }else{

            // SerialNo newSerialNo = new SerialNo();
            for (GrnHasAccessories grnHasAccessories : grn.getGrnHasAccessories()) {

                Accessories savAccessories = accessoriesDao.save(grnHasAccessories.getAccessories());

                grnHasAccessories.setAccessories(savAccessories);
                grnHasAccessories.setGrn_id(grn);
                Integer qty = grnHasAccessories.getQty();
                System.out.println(qty);
                String icode = savAccessories.getItemcode();
                for (int i = 0; i < qty; i++) {
                    SerialNo serialNo = new SerialNo();
                    serialNo.setItemcode(icode + "-" + (i + 1));
                    serialNo.setItemprice(grnHasAccessories.getUnitprice());
                    serialNo.setAvailability(true);
                    serialNo.setCategory_id(categoryDao.getReferenceById(9));
                    // serialNo.setGrn_has_category_id();
                    serialNoDao.save(serialNo);
                    System.out.println("OK");

                }

                // grnHasAccessories.setAccessories_id(grnHasAccessories.getAccessories_id());
            }
            for (GrnHasCategory grnHasCategory : grn.getGrnHasCategory()) {
                grnHasCategory.setGrn_id(grn);
                grnHasCategory.setItemcode("ITEM001");
                // System.out.println(grn);
                // grnHasCategory = grnHasCategoryDao.save(grnHasCategory);
                for (SerialNo newSerials : grnHasCategory.getSerialNumbers()) {
                    // newSerials.set
                    newSerials.setAvailability(Boolean.TRUE);
                    newSerials.setCategory_id(grnHasCategory.getCategory_id());
                    newSerials.setItemcode(grnHasCategory.getItemcode());
                    newSerials.setItemname(grnHasCategory.getItemname());
                    newSerials.setGrn_has_category_id(grnHasCategory);// Set the reference
                    barcodeGenerator.generateQRCodee(newSerials);

                    // serialNoDao.save(newSerials);
                    // newSerials.setGrn_has_category_id(grnHasCategory);
                    // serialNoDao.save(newSerials);
                }

                // grnHasCategory.setGrn_id(grn);
                // newItem.setItemname(grnHasCategory.getItemname());
                // newItem.setItem_price(grnHasCategory.getItem_price());
                // newItem.setItemcode(grnHasCategory.getItemcode());
                // availableitemsDao.save(newItem);
                // newItem.setSerialno(newSerial.getSerialno());

                // newItem.setSerialno(grnHasCategory.getAvailableitems_id().getSerialno());
                // newItem.setSerialno(grnHasCategory.getSerialno());
                // System.out.println(grnHasCategory);
                // return "Ok";
            }
            // }
            grn.setAddeduser_id(dao.getUsersByUsername(auth.getName()));

            Grn saveGrn = dao.save(grn);
            return saveGrn.getId().toString();
        } catch (Exception e) {
            return "Save not completed :" + e.getMessage();
        }

    }

    @PutMapping(value = "/grn/{id}")
    // @PutMapping(value = "/grn")
    @Transactional
    // public Grn updateGrn(@PathVariable Integer id, @RequestBody Grn grn) {
    // System.out.println(id);
    // System.out.println(dao.findById(id));
    // return dao.findById(id)
    // .map(onegrn -> {
    // System.out.println(onegrn);
    // // onegrn.setId(grn.getId());
    // onegrn.setSupplierinvoiceno(grn.getSupplierinvoiceno());
    // onegrn.setNetamount(grn.getNetamount());
    // return dao.save(onegrn);
    // })
    // .orElseGet(() -> {
    // System.out.println("new grn");
    // grn.setId(id);
    // return dao.save(grn);
    // });
    // }
    public Grn updateGrn(@PathVariable Integer id, @RequestBody Grn grn) { // meken backend eke db eke twice wadin na
        // post krapu grn value ekata update ekk gahwanw // single record ehekata
        Grn objectGrn = dao.getGrnIdByPurchaseId(id);
        Grn existingGrn = objectGrn;

        // ExpensePayment expensePayment = grn.getExpensePayments();
        // expensePayment.setGrn_id(grn);
        // expensePayment.setGrnpayemntdate(LocalDate.now());

        // expensePayment.setGrnno("0001");

        if (existingGrn != null) {
            existingGrn.setDiscountrate(grn.getDiscountrate());
            existingGrn.setTotalamount(grn.getTotalamount());
            existingGrn.setSupplierinvoiceno(grn.getSupplierinvoiceno());
            existingGrn.setNetamount(grn.getNetamount());
            return dao.save(existingGrn);
        } else {

            return null;
        }
    }
    // public String update(@RequestBody Grn grn) {

    // try {
    // // for (GrnHasCategory grnHasCategory : grn.getGrnHasCategory()) {
    // // grnHasCategory.setGrn_id(grn);
    // // }
    // Grn saveGrn = dao.save(grn);
    // return saveGrn.getId().toString();
    // } catch (Exception e) {
    // return "Save not completed :" + e.getMessage();
    // }
    // }

    // public ResponseEntity<Grn> updateGrn(@PathVariable Integer id, @RequestBody
    // Grn grn) {
    // Optional<Grn> optionalGrn = dao.getGrnIdByPurchaseId(id);
    // if (optionalGrn.isPresent()) {
    // Grn existingGrn = optionalGrn.get();
    // existingGrn.setDiscountrate(grn.getDiscountrate());
    // existingGrn.setTotalamount(grn.getTotalamount());
    // existingGrn.setSupplierinvoiceno(grn.getSupplierinvoiceno());
    // existingGrn.setNetamount(grn.getNetamount());
    // Grn updatedGrn = dao.save(existingGrn);
    // return ResponseEntity.ok(updatedGrn);
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }
}
