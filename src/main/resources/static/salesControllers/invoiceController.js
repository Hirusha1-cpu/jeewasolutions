window.addEventListener('load', () => {
    refreshInvoiceForm();
    // refreshGrnTable();

})
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    
    uploadForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("ssss");
    const formData = new FormData();
    formData.append('qrCodeImage', document.getElementById('qrCodeImage').files[0]);

    fetch('/invoice/read-qr-code', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log('QR code content:', data);
        // Do something with the QR code content (e.g., display it on the page)
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
    });
})
});

const refreshInvoiceForm = () =>{
    const invoiceSerialId = document.getElementById('invoiceSerialId');
    
}