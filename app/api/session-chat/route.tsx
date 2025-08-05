import { SessionChatTable } from "@/config/schema";
import {v4 as uuidv4} from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

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

// Remove this function, as you are importing uuidv4 from 'uuid' at the top.
