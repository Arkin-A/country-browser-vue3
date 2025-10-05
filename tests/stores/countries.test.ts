import {createPinia, setActivePinia} from 'pinia'
import {useCountriesStore} from '@/stores/countries'
import {beforeEach, describe, expect, it} from 'vitest'

describe('countries store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('normalizes and filters countries correctly', () => {
        const store = useCountriesStore()
        store.all = [
            {name: {common: 'Åland'}, region: 'Europe', capital: ['Mariehamn'], flags: {}} as any,
            {name: {common: 'Germany'}, region: 'Europe', capital: ['Berlin'], flags: {}} as any,
        ]

        store.setQuery('Aland')
        expect(store.filtered.length).toBe(1)
        expect(store.filtered[0].name.common).toBe('Åland')
    })
})
