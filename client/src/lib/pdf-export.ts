import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportToPDF(
  element: HTMLElement,
  filename: string = "cv.pdf"
): Promise<void> {
  try {
    // Get the inner template (unscaled)
    const templateDiv = element.querySelector("div") as HTMLElement;
    if (!templateDiv) throw new Error("Template not found");

    // Create invisible container at A4 width
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "210mm";
    container.style.background = "#fff";
    container.style.padding = "0";
    container.style.margin = "0";
    container.style.zIndex = "-1";

    // Clone without transform
    const clone = templateDiv.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.width = "100%";
    clone.style.margin = "0";

    container.appendChild(clone);
    document.body.appendChild(container);

    // Wait for rendering
    await new Promise(r => setTimeout(r, 200));

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: "#ffffff",
      allowTaint: true,
      useCORS: true,
      logging: false,
      windowWidth: 794,
    });

    document.body.removeChild(container);

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/png");

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

    // Download
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Export:", error);
    throw error;
  }
}
