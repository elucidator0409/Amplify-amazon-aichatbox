import { useState } from "react";
import { callGemini } from "../utils/geminiApi";

function GenerateSimple() {
    const [description, setDescription] = useState("");
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;
        setLoading(true);
        const prompt = `Hãy tạo một công thức nấu ăn dựa trên mô tả sau: ${description}`;
        const result = await callGemini(prompt);
        setRecipe(result);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Nhập mô tả món ăn..."
            />
            <button type="submit" disabled={loading}>Tạo công thức</button>
            {loading && <div>Đang sinh công thức...</div>}
            {recipe && <pre>{recipe}</pre>}
        </form>
    );
}

export default GenerateSimple;