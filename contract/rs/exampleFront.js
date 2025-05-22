import { useState } from "react";

export default function UploadAndWait() {
  const [status, setStatus] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = event.target.elements.document.files[0];
    formData.append("document", fileInput);

    // 1. Send the file to the backend
    const response = await fetch("https://your-railway-server.com/sendDoc", {
      method: "POST",
      body: formData,
    });

    const { requestId } = await response.json();
    setRequestId(requestId);
    setStatus("pending");

    // 2. Start polling for status
    pollForStatus(requestId);
  };

  const pollForStatus = async (id) => {
    const interval = setInterval(async () => {
      const res = await fetch(`https://your-railway-server.com/status/${id}`);
      const data = await res.json();

      if (data.status === "done") {
        clearInterval(interval);
        setStatus("done");
        // 3. Redirect or start download
        window.location.href = `https://your-railway-server.com/download/${id}`;
      } else {
        setStatus("pending");
      }
    }, 2000); // Poll every 2 seconds
  };

  return (
    <div>
      <h1>Upload Document</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="document" required />
        <button type="submit">Send</button>
      </form>

      {status === "pending" && <p>Waiting for file to compile...</p>}
      {status === "done" && <p>Compiled! Redirecting...</p>}
    </div>
  );
}