import { useState } from "react";
import { callGemini } from "../utils/geminiApi";
// import { callStabilityUltra } from "../utils/dalleApi";

function GenerateImage() {
  const [description, setDescription] = useState("");
  const [dishName, setDishName] = useState("");
  const [recipe, setRecipe] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setDishName("");
    setRecipe("");
    // setImageUrl("");
    setLoading(true);

    // 1. Gợi ý tên món ăn
    const name = await callGemini(
      `Suggest a creative, catchy, and short name for a dish based on this description: ${description}. Only return the name, nothing else.`
    );
    setDishName(name.replace(/["']/g, ""));

    // 2. Gọi Gemini để sinh công thức
    const recipeText = await callGemini(
      `Create a short and summarized food recipe (no more than 5 lines, only main steps and main ingredients) for: ${description}`
    );
    setRecipe(recipeText);

    // 3. Gọi Stability AI để sinh hình ảnh từ mô tả món ăn
    // const image = await callStabilityUltra(description);
    // setImageUrl(image);

    setLoading(false);
  };

  return (
    <main>
      <h2>Recipe & Image Generator</h2>
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Input details of food..."
        style={{ width: "60%" }}
      />
      <button onClick={handleGenerate} disabled={loading}>Create recipe and image</button>
      {loading && <div>Generating recipe, name and image...</div>}
      {dishName && (
        <div>
          <h3>Auto Generated Dish Name:</h3>
          <div style={{ fontWeight: "bold", fontSize: "1.3em", color: "#d2691e" }}>{dishName}</div>
        </div>
      )}
      {recipe && (
        <div>
          <h3>Recipe:</h3>
          <pre>{recipe}</pre>
        </div>
      )}
      {(recipe && dishName) && (
        <div>
          <h3>Image:</h3>
          <div style={{
            background: '#ffeeba',
            color: '#222',
            padding: '16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '12px',
            border: '1px solid #ffeeba',
            textAlign: 'center'
          }}>
            🚧 This feature is under development. Image generation will be available soon!
          </div>
        </div>
      )}
    </main>
  );
}

export default GenerateImage;