import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function exportToPDF(
  element: HTMLElement,
  filename: string = "cv.pdf"
): Promise<void> {
  try {
    console.log("Starting PDF export...");
    
    // Create a temporary container with proper styling for PDF export
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-10000px";
    container.style.top = "-10000px";
    container.style.width = "210mm";
    container.style.height = "297mm";
    container.style.padding = "10mm";
    container.style.backgroundColor = "#ffffff";
    container.style.zIndex = "-9999";
    
    // Clone the full element
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Remove transform scaling
    clone.style.transform = "none";
    clone.style.transformOrigin = "none";
    clone.style.width = "100%";
    clone.style.height = "auto";
    
    container.appendChild(clone);
    document.body.appendChild(container);
    
    console.log("Container added to DOM");
    
    // Wait for rendering
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get actual dimensions of cloned element
    const containerRect = container.getBoundingClientRect();
    console.log("Container dimensions:", containerRect);
    
    // Capture container as canvas
    const canvas = await html2canvas(container, {
      allowTaint: true,
      useCORS: true,
      logging: true,
      scale: 1,
      backgroundColor: "#ffffff",
      windowWidth: 794, // 210mm at 96dpi
      windowHeight: Math.max(1123, containerRect.height), // 297mm at 96dpi
    });

    console.log("Canvas created:", canvas.width, "x", canvas.height);

    // Clean up
    document.body.removeChild(container);

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");
    console.log("Image data URL created, length:", imgData.length);

    // Calculate dimensions
    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    console.log("Calculated dimensions - imgWidth:", imgWidth, "imgHeight:", imgHeight);

    // Add pages
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, Math.min(imgHeight, pageHeight));
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    console.log("Triggering PDF download:", filename);

    // Download using blob approach instead of pdf.save()
    const pdfBlob = pdf.output("blob");
    console.log("PDF blob created:", pdfBlob.size, "bytes");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = filename;
    document.body.appendChild(link);
    console.log("Link created and added to DOM");

    // Trigger download
    link.click();
    console.log("Link clicked");

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      console.log("Cleanup completed");
    }, 100);
    
    console.log("PDF export completed");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}
