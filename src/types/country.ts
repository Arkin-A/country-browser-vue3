/**
 * Represents a country returned by the REST Countries API.
 * Only includes selected fields used in the application.
 */
export interface Country {
    /** Country name (common = display name, official = formal name). */
    name: { common: string; official?: string };
    /** URLs and metadata for the country flag. */
    flags: { png?: string; svg?: string; alt?: string };
    /** Capital city/cities (may be empty for some territories). */
    capital?: string[];
    /** Continent or world region (e.g., "Europe", "Asia"). */
    region?: string;
    /** Total population of the country. */
    population?: number;
    /** ISO 3166-1 alpha-2 country code (e.g., "DE"). */
    cca2?: string;
    /** ISO 3166-1 alpha-3 country code (e.g., "DEU"). */
    cca3?: string;
}

