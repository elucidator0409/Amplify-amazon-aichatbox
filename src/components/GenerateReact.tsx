import { useState } from "react";
import { callGemini } from "../utils/geminiApi";
import '@aws-amplify/ui-react/styles.css'

function GenerateReact() {
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!description.trim()) return;
    setLoading(true);
    const prompt = `Hãy tạo một công thức nấu ăn dựa trên mô tả sau: ${description}`;
    const result = await callGemini(prompt);
    setRecipe(result);
    setLoading(false);
  };

  return (
    <div>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Nhập mô tả món ăn..."
      />
      <button onClick={handleClick} disabled={loading}>Tạo công thức</button>
      {loading && <div>Đang sinh công thức...</div>}
      {recipe && <pre>{recipe}</pre>}
    </div>
  );
}

export default GenerateReact;