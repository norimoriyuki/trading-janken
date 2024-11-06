import { db } from '@vercel/postgres';

const client = await db.connect();

/*export async function GET() {
    try {
        // 投稿データを新着順に取得
        const { rows } = await client.sql`
            SELECT * FROM test_board ORDER BY date DESC;
        `;

        return new Response(JSON.stringify({ posts: rows }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 });
    }
}*/

export async function POST(request: Request) {
    try {
        const { user_name, score } = await request.json();

        // 新しい投稿をデータベースに挿入
        await client.sql`
            INSERT INTO tj_score (user_name, score, t)
            VALUES (${user_name}, ${score}, NOW());
        `;

        return new Response(JSON.stringify({ message: 'Post added successfully' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to add post' }), { status: 500 });
    }
}