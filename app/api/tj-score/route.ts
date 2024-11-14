import { db } from '@vercel/postgres';

const client = await db.connect();

export async function GET() {
    try {
        // 投稿データを新着順に取得
        const { rows } = await client.sql`
            SELECT t, user_name, score FROM tj_score ORDER BY score DESC, t  LIMIT 100;
        `;
    
        const formattedRows = rows.map(row => ({
            ...row,
            date: new Date(row.t).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: "Asia/Tokyo"
            })
        }));

        return new Response(JSON.stringify({ posts: formattedRows }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }), { status: 500 });
    }
}

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
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }), { status: 500 });
    }
}
