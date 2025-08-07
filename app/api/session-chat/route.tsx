import { SessionChatTable } from "@/config/schema";
import {v4 as uuidv4} from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm"; // <-- Add this import

export async function POST(req: NextRequest) {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();
    try{
        const sessionID = uuidv4();
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionID, // Change 'id' to match your schema's primary key column name
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdOn: new Date().toISOString(),
            //@ts-ignore
        }).returning({ SessionChatTable });
            
        return NextResponse.json(result[0]?.SessionChatTable);
    } catch (e) {
        return NextResponse.json(e);
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');
        if (!sessionId) {
            return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
        }
        const user = await currentUser();
        const result = await db.select().from(SessionChatTable)
            .where(eq(SessionChatTable.sessionId, sessionId)); // <-- Use eq here
        if (!result[0]) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }
        return NextResponse.json(result[0]);
    } catch (e) {
        console.error('API error:', e);
        let errorMessage = "Unknown error";
        if (e instanceof Error) {
            errorMessage = e.message;
        } else if (typeof e === "string") {
            errorMessage = e;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
// Remove this function, as you are importing uuidv4 from 'uuid' at the top.