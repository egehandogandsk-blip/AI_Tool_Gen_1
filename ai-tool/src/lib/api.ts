export const generateImageDetails = (prompt: string, aspectRatio: string = "1:1") => {
    // Use a random seed for variety
    const seed = Math.floor(Math.random() * 10000000);

    let width = 1024;
    let height = 1024;

    if (aspectRatio === "16:9") {
        width = 1280;
        height = 720;
    } else if (aspectRatio === "9:16") {
        width = 720;
        height = 1280;
    }

    // Default to 'flux' as it is the current high-quality free model
    // Pollinations sometimes requires 'flux' explicitly for better quality
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
