document.getElementById("qrForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("text").value;

  const response = await fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text })
  });

  if (response.ok) {
    const qrCodeBlob = await response.blob();
    const qrCodeUrl = URL.createObjectURL(qrCodeBlob);

    const qrCodeImg = document.createElement("img");
    qrCodeImg.src = qrCodeUrl;
    qrCodeImg.alt = "QR Code";

    //download link
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.textContent = "Download QR Code";

    const qrCodeDiv = document.getElementById("qrCode");
    qrCodeDiv.innerHTML = ""; 
    qrCodeDiv.appendChild(qrCodeImg);
    qrCodeDiv.appendChild(downloadLink);
  } else {
    alert("Failed to generate QR Code. Please try again.");
  }
});
