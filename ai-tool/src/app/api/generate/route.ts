import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const prompt = searchParams.get('prompt');
    const width = searchParams.get('width') || '1024';
    const height = searchParams.get('height') || '1024';
    const seed = searchParams.get('seed') || Math.floor(Math.random() * 1000000).toString();
    const model = searchParams.get('model') || 'flux';

    if (!prompt) {
        return new NextResponse('Prompt is required', { status: 400 });
    }

    const encodedPrompt = encodeURIComponent(prompt);
    const externalUrl = `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`;

    try {
        const response = await fetch(externalUrl);

        if (!response.ok) {
            throw new Error(`External API responded with ${response.status}`);
        }

        const imageBuffer = await response.arrayBuffer();
        const headers = new Headers();
        headers.set('Content-Type', 'image/jpeg');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error('Image Generation Error:', error);
        return new NextResponse('Failed to generate image', { status: 500 });
    }
}
