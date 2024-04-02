package lk.example.jeewacomputers.grnanditem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
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
import lk.example.jeewacomputers.grnanditem.dao.GrnDao;
import lk.example.jeewacomputers.grnanditem.entity.Grn;
import lk.example.jeewacomputers.grnanditem.entity.GrnHasCategory;

@RestController
public class GrnController {
    @Autowired
    // create dao object
    private GrnDao dao;

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
    @Transactional
    public String save(@RequestBody Grn grn) {

        try {
            for (GrnHasCategory grnHasCategory : grn.getGrnHasCategory()) {
                grnHasCategory.setGrn_id(grn);
            }
            Grn saveGrn = dao.save(grn);
            return saveGrn.getId().toString();
        } catch (Exception e) {
            return "Save not completed :" + e.getMessage();
        }
    }

    @PutMapping(value = "/grn/{id}")
    @Transactional
    // public Grn updateGrn(@PathVariable Integer id, @RequestBody Grn grn) {
    //     System.out.println(id);
    //     System.out.println(dao.findById(id));
    //     return dao.findById(id)
    //     .map(onegrn -> {
    //         System.out.println(onegrn);
    //         // onegrn.setId(grn.getId());
    //         onegrn.setSupplierinvoiceno(grn.getSupplierinvoiceno());
    //         onegrn.setNetamount(grn.getNetamount());
    //       return dao.save(onegrn);
    //     })
    //     .orElseGet(() -> {
    //         System.out.println("new grn");
    //         grn.setId(id);
    //       return dao.save(grn);
    //     });      
    // }
    public Grn updateGrn(@PathVariable Integer id, @RequestBody Grn grn) {
        Grn objectGrn = dao.getGrnIdByPurchaseId(id);
        Grn existingGrn = objectGrn;
    
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
    // public ResponseEntity<Grn> updateGrn(@PathVariable Integer id, @RequestBody Grn grn) {
    //     Optional<Grn> optionalGrn = dao.getGrnIdByPurchaseId(id);
    //     if (optionalGrn.isPresent()) {
    //         Grn existingGrn = optionalGrn.get();
    //         existingGrn.setDiscountrate(grn.getDiscountrate());
    //         existingGrn.setTotalamount(grn.getTotalamount());
    //         existingGrn.setSupplierinvoiceno(grn.getSupplierinvoiceno());
    //         existingGrn.setNetamount(grn.getNetamount());
    //         Grn updatedGrn = dao.save(existingGrn);
    //         return ResponseEntity.ok(updatedGrn);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
}
