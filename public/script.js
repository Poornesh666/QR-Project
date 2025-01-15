document.getElementById("qrForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("text").value;

  // Fetch QR code from the server
  const response = await fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.ok) {
    const qrCodeBlob = await response.blob();
    const qrCodeUrl = URL.createObjectURL(qrCodeBlob);

    // Display the QR code image
    const qrCodeImg = document.createElement("img");
    qrCodeImg.src = qrCodeUrl;
    qrCodeImg.alt = "QR Code";

    // Create a download button
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeUrl;
    downloadLink.download = "qr-code.png";  // Set the default filename for the download
    downloadLink.textContent = "Download QR Code";

    const qrCodeDiv = document.getElementById("qrCode");
    qrCodeDiv.innerHTML = "";  // Clear previous QR code (if any)
    qrCodeDiv.appendChild(qrCodeImg);
    qrCodeDiv.appendChild(downloadLink);
  } else {
    alert("Failed to generate QR Code. Please try again.");
  }
});
