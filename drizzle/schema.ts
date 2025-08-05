import { pgTable, unique, integer, varchar, foreignKey, text, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	credits: integer(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const sessionChatTable = pgTable("SessionChatTable", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: ""SessionChatTable_id_seq"", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	sessionId: varchar().notNull(),
	notes: text(),
	selectedDoctor: json(),
	conversation: json(),
	report: json(),
	createdBy: varchar(),
	createdOn: varchar(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.email],
			name: "SessionChatTable_createdBy_users_email_fk"
		}),
]);
