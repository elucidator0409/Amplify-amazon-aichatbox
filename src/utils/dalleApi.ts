export async function callStabilityUltra(prompt: string): Promise<string> {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("output_format", "png"); // hoặc "jpeg"
  formData.append("aspect_ratio", "1:1");  // hoặc "16:9", "3:4", v.v.

  const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/sd3", {
    method: "POST",
    headers: {
      "Authorization": "Bearer sk-i854VI2pvc7T08HjEGROjideFScCExKhf2EVII1HM9yjl6PF",
      "Accept": "application/json"
      // KHÔNG set Content-Type, fetch sẽ tự động set đúng boundary cho multipart
    },
    body: formData
  });

  const data = await response.json();
  console.log("Stability AI API response:", data);
  if (data.image) {
    return `data:image/png;base64,${data.image}`;
  }
  throw new Error(data.error?.message || "Image generation failed");
}
// Thay YOUR_STABILITY_API_KEY bằng API Key của bạn. 
