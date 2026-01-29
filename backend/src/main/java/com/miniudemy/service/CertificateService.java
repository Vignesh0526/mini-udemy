package com.miniudemy.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.miniudemy.entity.Course;
import com.miniudemy.entity.User;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class CertificateService {

    public byte[] generateCertificate(User user, Course course) throws DocumentException {
        // Landscape A4
        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        try {
            // Load background image
            org.springframework.core.io.Resource resource = new org.springframework.core.io.ClassPathResource(
                    "certificate_bg.png");
            if (resource.exists()) {
                Image img = Image.getInstance(resource.getURL());
                // Scale to fit the page
                img.scaleAbsolute(PageSize.A4.rotate());
                img.setAbsolutePosition(0, 0);
                document.add(img);
            }
        } catch (Exception e) {
            System.err.println("Could not load certificate background: " + e.getMessage());
        }

        // Font Styles
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 36, BaseColor.DARK_GRAY);
        Font nameFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 40, new BaseColor(218, 165, 32)); // Gold-ish
        Font textFont = FontFactory.getFont(FontFactory.HELVETICA, 18, BaseColor.GRAY);
        Font courseFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 28, BaseColor.BLACK);
        Font dateFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 14, BaseColor.BLACK);

        // Spacer to push text down to center (adjust as needed based on bg)
        // A4 height is ~595 pts. Center is ~300.
        Paragraph spacer = new Paragraph("\n\n\n\n\n\n");
        document.add(spacer);

        Paragraph title = new Paragraph("CERTIFICATE OF COMPLETION", headerFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph("\n"));

        Paragraph subtitle = new Paragraph("This is to certify that", textFont);
        subtitle.setAlignment(Element.ALIGN_CENTER);
        document.add(subtitle);

        document.add(new Paragraph("\n"));

        String fullName = (user.getFirstName() != null ? user.getFirstName() : "") + " " +
                (user.getLastName() != null ? user.getLastName() : "");
        Paragraph recipientName = new Paragraph(fullName.trim(), nameFont);
        recipientName.setAlignment(Element.ALIGN_CENTER);
        document.add(recipientName);

        document.add(new Paragraph("\n"));

        Paragraph text = new Paragraph("Has successfully completed the course", textFont);
        text.setAlignment(Element.ALIGN_CENTER);
        document.add(text);

        document.add(new Paragraph("\n"));

        Paragraph courseTitle = new Paragraph(course.getTitle(), courseFont);
        courseTitle.setAlignment(Element.ALIGN_CENTER);
        document.add(courseTitle);

        document.add(new Paragraph("\n\n\n"));

        // Date and Signature Table
        com.itextpdf.text.pdf.PdfPTable table = new com.itextpdf.text.pdf.PdfPTable(2);
        table.setWidthPercentage(80);

        // Date
        java.time.format.DateTimeFormatter dtf = java.time.format.DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        String dateStr = java.time.LocalDate.now().format(dtf);

        com.itextpdf.text.pdf.PdfPCell dateCell = new com.itextpdf.text.pdf.PdfPCell(
                new Paragraph("Date: " + dateStr, dateFont));
        dateCell.setBorder(Rectangle.NO_BORDER);
        dateCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.addCell(dateCell);

        // Signature
        String instructorName = (course.getInstructor() != null && course.getInstructor().getFirstName() != null)
                ? course.getInstructor().getFirstName() + " " + course.getInstructor().getLastName()
                : "Instructor";

        Paragraph sigP = new Paragraph("Instructor: " + instructorName, dateFont);
        com.itextpdf.text.pdf.PdfPCell sigCell = new com.itextpdf.text.pdf.PdfPCell(sigP);
        sigCell.setBorder(Rectangle.NO_BORDER);
        sigCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(sigCell);

        document.add(table);

        document.close();

        return out.toByteArray();
    }
}
