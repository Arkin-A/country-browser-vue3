import type {Country} from '@/types/country'

const ENDPOINT = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca2,cca3'

/**
 * Fetches and normalizes country data from the REST Countries API.
 *
 * @returns Promise that resolves to a sorted list of countries with normalized data.
 * @throws Error When the HTTP response is not OK (non-2xx status).
 *
 * @remarks
 * - Returns only selected fields (name, flags, capital, region, population, cca2, cca3).
 * - Normalizes `capital` to always be an array for template safety.
 * - Sorts countries alphabetically by their common name.
 */

export async function fetchCountries(): Promise<Country[]> {
    const res = await fetch(ENDPOINT, {headers: {Accept: 'application/json'}})
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as Country[]
    return data
        .map(c => ({...c, capital: c.capital ?? []}))
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
}
