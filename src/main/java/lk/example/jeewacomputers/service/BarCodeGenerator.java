package lk.example.jeewacomputers.service;

import java.io.IOException;
import java.nio.file.*;
import java.awt.image.BufferedImage; // For BufferedImage
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.FormatException;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;
import java.util.Base64;
import lk.example.jeewacomputers.grnanditem.entity.SerialNo;

@Service
public class BarCodeGenerator {

    public static void generateQRCodee(SerialNo serialNo) throws WriterException, IOException {
        String qrCodePath = "/Users/hirushafernando/Documents/Project_BIT/PROJECT/jeewa_main/Ui_Structures";
        String qrCodeName = qrCodePath +"--"+serialNo.getSerialno() + "-QRCODE.png";
        var qrcode = new QRCodeWriter();
        BitMatrix bitMatrix = qrcode.encode(serialNo.getSerialno(), BarcodeFormat.QR_CODE, 400, 400);
        Path path = FileSystems.getDefault().getPath(qrCodeName);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

        // @Autowired
        // private BarCodeGenerator barcodeGenerator; // Inject the BarcodeGenerator
        // service

        // barcodeGenerator.generateQRCodee(entity instance);

    }

    // public String readQRCode(MultipartFile qrCodeFile) throws IOException, NotFoundException, FormatException {
    //     // BufferedImage bufferedImage = ImageIO.read(new
    //     // File("/Users/hirushafernando/Documents/Project_BIT/PROJECT/jeewa_main/Ui_Structures-QRCODE.png"));
    //     // // Corrected import and class name
    //     File tempFile = File.createTempFile("qr_code", ".png"); // Adjust extension if needed
    //     qrCodeFile.transferTo(tempFile);
    //     BufferedImage bufferedImage = ImageIO.read(tempFile); // Corrected import and class name
    //     LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
    //     BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));
    //     Result result = new MultiFormatReader().decode(binaryBitmap);
    //     tempFile.delete();
    //     return result.getText();
    // }
    @PostMapping("/invoice/read-qr-code")
    public String readQRCode(@RequestParam("qrCodeImage") MultipartFile qrCodeImage) throws NotFoundException, FormatException {
        try {
            // Convert the image to base64 string
            String base64Image = Base64.getEncoder().encodeToString(qrCodeImage.getBytes());

            // Decode QR code
            String qrCodeContent = readQRCode(base64Image);
            

            return qrCodeContent;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error reading QR code: " + e.getMessage();
        }
    }
    public String readQRCode(String qrCodeStream) throws IOException, NotFoundException, FormatException {
        BufferedImage bufferedImage = ImageIO.read(new FileInputStream(qrCodeStream));
        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));
        Result result = new MultiFormatReader().decode(binaryBitmap);
        System.out.println(result.getText());
        return result.getText();
    }
    // String qr = barCodeReader.readQRCode();
    // System.out.println(qr);
    // @Autowired
    // private BarCodeGenerator barCodeReader;

   

}
