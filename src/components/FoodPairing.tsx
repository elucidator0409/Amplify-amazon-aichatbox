import { useState } from "react";
import { callGemini } from "../utils/geminiApi";

function FoodPairing() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setResult("");
    setLoading(true);
    const prompt = `
Given the dish: "${input}", suggest:
- 1-2 side dishes or accompaniments that pair well with it.
- 1 drink (alcoholic or non-alcoholic) that best complements the meal.
- For each suggestion, give a short reason why it matches.
Format your answer as:
Side Dishes: ...
Drink: ...
Reason: ...
    `;
    const suggestion = await callGemini(prompt);
    setResult(suggestion);
    setLoading(false);
  };

  return (
    <main>
      <h2>AI Food Pairing & Drink Suggestion</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter a dish name or description..."
        style={{ width: "60%" }}
      />
      <button onClick={handleSuggest} disabled={loading}>Suggest Pairing</button>
      {loading && <div>Generating suggestions...</div>}
      {result && (
        <div style={{ marginTop: 20, background: "#f6f6f6", padding: 16, borderRadius: 8 }}>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </main>
  );
}

export default FoodPairing; 