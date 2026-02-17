export const generateImageDetails = (prompt: string) => {
    const seed = Math.floor(Math.random() * 1000000);
    const width = 1024;
    const height = 1024;
    // Using 'flux' model for high quality, or default if not specified
    const model = 'flux'; // or 'any'

    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`;

    return {
        imageUrl,
        seed,
        width,
        height,
        model
    };
};
