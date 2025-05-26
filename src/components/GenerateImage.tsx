import { client } from "../AiClient";
import type { Schema } from "../../amplify/data/resource";
import { type FormEvent, useState, useEffect } from "react";

type Recipe = Schema['generateRecipe']['type']

function GenerateImage(){

    const [description, setDescription] = useState("");
    const [generatedRecipe, setGeneratedRecipe] = useState<Recipe>()
    const [generatedImage, setGeneratedImage] = useState<string>()
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [shouldFetchRecipe, setShouldFetchRecipe] = useState(false);

    const handleClick = (e: FormEvent) => {
        e.preventDefault();
        setGeneratedRecipe(undefined);
        setGeneratedImage(undefined);
        setShouldFetchRecipe(true); // trigger gọi API sau khi UI đã reset
    };

    useEffect(() => {
        if (shouldFetchRecipe) {
            (async () => {
                const result = await client.generations.generateRecipe({
                    description: description
                });
                if (result.data) {
                    setGeneratedRecipe(result.data);
                    // Gọi luôn generateImage với recipe mới
                    setIsLoadingImage(true);
                    const imageResult = await client.queries.generateImage({
                        prompt: `Create an image for this dish: ${result.data.name || description}`
                    });
                    setIsLoadingImage(false);
                    const dataImage = imageResult.data;
                    if (dataImage && dataImage[0]) {
                        const image = dataImage[0];
                        setGeneratedImage(`data:image/png;base64,${image}`);
                    }
                }
                setShouldFetchRecipe(false);
            })();
        }
    }, [shouldFetchRecipe, description]);

    function renderRecipe() {
        if (generatedRecipe) {
            const ingredientsList = []
            if (generatedRecipe.ingredients) {
                for (const ingredient of generatedRecipe.ingredients) {
                    ingredientsList.push(<li key={ingredient}>{ingredient}</li>)
                }
            }
            return <div>
                <h2>{generatedRecipe.name}</h2>
                {ingredientsList}
                <h3>{generatedRecipe.instructions}</h3>
            </div>
        }
    }

    async function generateImage(){
        // Nếu chưa có recipe, tự động gọi API tạo recipe trước
        if (!generatedRecipe && description) {
            const recipeResult = await client.generations.generateRecipe({
                description: description
            });
            if (recipeResult.data) {
                setGeneratedRecipe(recipeResult.data);
            }
        }
        setIsLoadingImage(true);
        const result = await client.queries.generateImage({
            prompt: `Create an image for this dish: ${description}`
        })
        setIsLoadingImage(false);
        console.log(result)
        const dataImage = result.data
        if (dataImage && dataImage[0]) {
            const image = dataImage[0]
            setGeneratedImage(`data:image/png;base64,${image}`)
        }
    }

    function renderGeneratedImage(){
        if (isLoadingImage) {
            return (
                <div
                    style={{
                        background: "#fffbe6",
                        color: "#d48806",
                        fontWeight: "bold",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center",
                        margin: "16px 0",
                        fontSize: "1.2em",
                        border: "2px solid #ffe58f"
                    }}
                >
                    Generating image, please wait...
                </div>
            );
        }
        if (generatedImage) {
            return <img src={generatedImage} alt="Generated image" />
        }
    }

    return <main>
        <form onSubmit={(e) => handleClick(e)}>
            <label> Recipe:</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
            
            <button type="button" onClick={generateImage} disabled={isLoadingImage}>Generate image</button>
        </form>
        <br />
        {renderRecipe()}
        {renderGeneratedImage()}
    </main>
}

export default GenerateImage