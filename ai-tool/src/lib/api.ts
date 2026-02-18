export const generateImageDetails = (prompt: string) => {
    // Use a random seed for variety
    const seed = Math.floor(Math.random() * 10000000);
    const width = 1024;
    const height = 1024;
    // Default to 'flux' as it is the current high-quality free model
    const model = 'flux';

    const encodedPrompt = encodeURIComponent(prompt);

    // Add cache-busting timestamp
    const timestamp = Date.now();

    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true&t=${timestamp}`;

    return {
        imageUrl,
        seed,
        width,
        height,
        model
    };
};
