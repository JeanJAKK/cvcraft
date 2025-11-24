import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function exportToPDF(
  element: HTMLElement,
  filename: string = "cv.pdf"
): Promise<void> {
  try {
    // Find the inner template element (unscaled)
    const innerElement = element.querySelector("div:first-child") as HTMLElement || element;
    
    // Create a temporary container with proper styling for PDF export
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    container.style.width = "210mm";
    container.style.zIndex = "-1";
    
    // Clone the template without transform
    const clone = innerElement.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.transformOrigin = "none";
    
    container.appendChild(clone);
    document.body.appendChild(container);
    
    // Wait a moment for rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Capture as canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      imageTimeout: 0,
      windowHeight: 1189, // A4 height at 96dpi
    });

    // Remove temporary container
    document.body.removeChild(container);

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // Calculate image dimensions
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}
