import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type {Country} from '@/types/country'
import {fetchCountries} from '@/services/countriesApi'

export const useCountriesStore = defineStore('countries', () => {

    // --- State ---

    const all = ref<Country[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const query = ref('')
    const page = ref(1)
    const pageSize = ref(15)
    const selected = ref<Country | null>(null)

    // --- Actions ---

    async function load(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            all.value = await fetchCountries()
            page.value = 1 // Reset to the first page after a fresh load
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }

    function setQuery(q: string): void {
        query.value = q;
        page.value = 1
    }

    function select(c: Country | null): void {
        selected.value = c
    }

    function nextPage(): void {
        if (page.value < totalPages.value) page.value++
    }

    function prevPage(): void {
        if (page.value > 1) page.value--
    }

    // --- Getters ---

    /**
     * Normalizes a string for accent-insensitive, case-insensitive comparisons.
     *
     * - Removes diacritics using NFKD normalization.
     * - Converts all characters to lowercase.
     *
     * This allows searches like "Aland" to match "Åland".
     * @param s The input string to normalize.
     * @returns The normalized string.
     */

    function norm(s: string): string {
        return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    }

    const normalizedQuery = computed(() => norm(query.value.trim()))

    // Filter countries by normalized search query across name, region and capital

    const filtered = computed(() =>
        !normalizedQuery.value
            ? all.value
            : all.value.filter((c) => {
                const name = norm(c.name.common)
                const official = norm(c.name.official ?? '')
                const region = norm(c.region ?? '')
                const capital = norm(c.capital?.join(' ') ?? '')
                return (
                    name.includes(normalizedQuery.value) ||
                    official.includes(normalizedQuery.value) ||
                    region.includes(normalizedQuery.value) ||
                    capital.includes(normalizedQuery.value)
                )
            })
    )

    // Current page and number of items displayed per page
    const total = computed(() => filtered.value.length)
    const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

    const paged = computed(() => {
        const start = (page.value - 1) * pageSize.value
        return filtered.value.slice(start, start + pageSize.value)
    })

    return {

        // State
        all,
        isLoading,
        error,
        query,
        page,
        pageSize,
        selected,

        // Actions
        load,
        setQuery,
        select,
        nextPage,
        prevPage,

        // Getters
        filtered,
        paged,
        total,
        totalPages,
    }
})
