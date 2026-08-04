/* eslint-disable @typescript-eslint/naming-convention */
import { createHash } from 'crypto';
import * as mysql from 'mysql2';

export type JavaScriptApiNoteKind = 'function' | 'enum';

export interface JavaScriptApiNote {
	sourceId: string;
	groupName: string;
	entryName: string;
	kind: JavaScriptApiNoteKind;
	description: string;
	example: string;
}

interface JavaScriptApiNoteRow {
	source_id: string;
	group_name: string;
	entry_name: string;
	kind: JavaScriptApiNoteKind;
	description: string | null;
	example: string | null;
}

const createTableSql = `
	CREATE TABLE IF NOT EXISTS \`javascript_api_note\` (
		\`source_id\` CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
		\`group_name\` VARCHAR(255) NOT NULL,
		\`entry_name\` VARCHAR(255) NOT NULL,
		\`kind\` VARCHAR(16) NOT NULL,
		\`description\` MEDIUMTEXT NOT NULL,
		\`example\` MEDIUMTEXT NOT NULL,
		\`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (\`source_id\`)
	) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
`;

export function createJavaScriptApiNoteId(groupName: string, entryName: string, kind: JavaScriptApiNoteKind): string {
	return createHash('sha256').update(`${kind}\0${groupName}\0${entryName}`, 'utf8').digest('hex');
}

export class JavaScriptApiNoteStore {
	private readonly notes = new Map<string, JavaScriptApiNote>();
	private initialized = false;

	constructor(private readonly config: mysql.ConnectionOptions) { }

	get isReady(): boolean {
		return this.initialized;
	}

	async initialize(): Promise<void> {
		await this.query(createTableSql);
		const rows = await this.query<JavaScriptApiNoteRow[]>('SELECT * FROM `javascript_api_note`;');
		this.notes.clear();
		for (const row of rows) {
			this.notes.set(row.source_id, {
				sourceId: row.source_id,
				groupName: row.group_name,
				entryName: row.entry_name,
				kind: row.kind,
				description: row.description ?? '',
				example: row.example ?? '',
			});
		}
		this.initialized = true;
	}

	get(groupName: string, entryName: string, kind: JavaScriptApiNoteKind): JavaScriptApiNote | undefined {
		return this.notes.get(createJavaScriptApiNoteId(groupName, entryName, kind));
	}

	async save(note: Omit<JavaScriptApiNote, 'sourceId'>): Promise<JavaScriptApiNote> {
		if (!this.initialized) {
			throw new Error('JavaScript API documentation storage is not ready.');
		}
		const savedNote: JavaScriptApiNote = {
			...note,
			sourceId: createJavaScriptApiNoteId(note.groupName, note.entryName, note.kind),
		};
		await this.query(
			`INSERT INTO \`javascript_api_note\`
				(\`source_id\`, \`group_name\`, \`entry_name\`, \`kind\`, \`description\`, \`example\`)
			VALUES (?, ?, ?, ?, ?, ?)
			ON DUPLICATE KEY UPDATE
				\`group_name\`=VALUES(\`group_name\`),
				\`entry_name\`=VALUES(\`entry_name\`),
				\`kind\`=VALUES(\`kind\`),
				\`description\`=VALUES(\`description\`),
				\`example\`=VALUES(\`example\`);`,
			[
				savedNote.sourceId,
				savedNote.groupName,
				savedNote.entryName,
				savedNote.kind,
				savedNote.description,
				savedNote.example,
			],
		);
		this.notes.set(savedNote.sourceId, savedNote);
		return savedNote;
	}

	private query<T = unknown>(sql: string, values: any[] = []): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const connection = mysql.createConnection(this.config);
			connection.query(sql, values, (error, results) => {
				connection.end();
				if (error) {
					reject(error);
					return;
				}
				resolve(results as T);
			});
		});
	}
}
