import { experimental_generateImage } from 'ai';
import { pollinations } from 'ai-sdk-pollinations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const prompt = searchParams.get('prompt');
    const width = parseInt(searchParams.get('width') || '1024');
    const height = parseInt(searchParams.get('height') || '1024');
    const seed = parseInt(searchParams.get('seed') || Math.floor(Math.random() * 1000000).toString());
    const model = searchParams.get('model') || 'flux'; // 'flux' or 'flux-realism' or others supported by the provider

    if (!prompt) {
        return new NextResponse('Prompt is required', { status: 400 });
    }

    try {
        const { image } = await experimental_generateImage({
            model: pollinations(model),
            prompt: prompt,
            n: 1,
            size: `${width}x${height}` as any, // Type casting as dynamic sizes might not be strictly typed in SDK
            seed: seed,
            providerOptions: {
                pollinations: {
                    nologo: true,
                    // API Key is automatically read from POLLINATIONS_API_KEY environment variable by the SDK
                }
            }
        });

        const imageBuffer = Buffer.from(image.base64, 'base64');

        const headers = new Headers();
        headers.set('Content-Type', 'image/jpeg');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: headers,
        });

    } catch (error) {
        console.error('AI SDK Generation Error:', error);
        return new NextResponse(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
    }
}
