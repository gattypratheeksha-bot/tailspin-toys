/**
 * Publisher lookup helpers for the Tailspin Toys storefront.
 *
 * This module exposes database access methods for retrieving publisher metadata
 * used by static pages and data-driven lists.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Return every publisher ordered alphabetically by name.
 *
 * @param db - Shared database instance used for the query.
 * @returns A list of publishers sorted by their display name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
