import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function exportToPDF(
  element: HTMLElement,
  filename: string = "cv.pdf"
): Promise<void> {
  try {
    // Find the actual CV template (first child div without scale transform)
    const templateElement = element.querySelector("div") as HTMLElement;
    if (!templateElement) {
      throw new Error("CV template element not found");
    }

    // Create wrapper div with A4 dimensions
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.top = "-10000px";
    wrapper.style.left = "-10000px";
    wrapper.style.width = "210mm";
    wrapper.style.backgroundColor = "#ffffff";
    wrapper.style.padding = "0";
    wrapper.style.margin = "0";

    // Clone template
    const clone = templateElement.cloneNode(true) as HTMLElement;
    
    // Remove all transforms from clone and children
    clone.style.transform = "none";
    clone.style.transformOrigin = "unset";
    clone.style.width = "100%";
    clone.style.height = "auto";
    clone.style.margin = "0";
    clone.style.padding = "0";

    // Remove transforms from all children
    const allElements = clone.querySelectorAll("*");
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.transform = "none";
      htmlEl.style.transformOrigin = "unset";
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Render to canvas
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      imageTimeout: 0,
      windowWidth: 794, // 210mm at 96dpi
      windowHeight: 1122, // 297mm at 96dpi
    });

    // Clean up wrapper
    document.body.removeChild(wrapper);

    // Calculate dimensions
    const a4Width = 210;
    const a4Height = 297;
    const imageWidth = a4Width;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imageData = canvas.toDataURL("image/png");
    let remainingHeight = imageHeight;
    let currentPosition = 0;

    // Add first page
    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      imageWidth,
      Math.min(imageHeight, a4Height)
    );
    remainingHeight -= a4Height;

    // Add additional pages
    while (remainingHeight > 0) {
      currentPosition = remainingHeight - imageHeight;
      pdf.addPage();
      pdf.addImage(imageData, "PNG", 0, currentPosition, imageWidth, imageHeight);
      remainingHeight -= a4Height;
    }

    // Convert to blob and download
    const pdfBlob = pdf.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    
    // Create temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    
    // Add to DOM and trigger click
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Export Error:", error);
    throw error;
  }
}
