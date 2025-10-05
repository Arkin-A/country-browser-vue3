<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import {useCountriesStore} from '@/stores/countries'

const store = useCountriesStore()

// Load countries on the first mount (only if data is empty)
onMounted(() => {
  if (!store.all.length) store.load()
})

// v-model proxy for the search field (binds input to store.query)
const q = computed({
  get: () => store.query,
  set: (val: string) => store.setQuery(val),
})

</script>

<template>
  <section class="container p-4">
    <!-- Header & search field -->
    <header class="app-header top-14 px-4 pt-2 pb-4 mb-6">
      <div class="max-w-2xl mx-auto">
        <input
            v-model="q"
            aria-label="Country search"
            class="input"
            placeholder="Search (e.g. Germany, Berlin, Europe)…"
            type="search"
        />
        <p class="mt-2 text-xs text-slate-500 text-center">
          {{ store.total }} countries found
        </p>
      </div>
    </header>

    <!-- Status messages -->
    <div v-if="store.isLoading" class="text-slate-500">Loading data…</div>
    <div v-else-if="store.error" class="text-red-600">Error: {{ store.error }}</div>

    <!-- Country list -->
    <ul
        v-else
        aria-label="Country list"
        class="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        role="list"
    >
      <li
          v-for="c in store.paged"
          :key="c.cca3 || c.name.common"
      >
        <RouterLink
            :aria-label="`Show details for ${c.name.common}`"
            :to="{ name: 'country', params: { code: c.cca3 || c.cca2 } }"
            class="group card-link"
        >
          <div class="flex items-center gap-4">
            <img
                :alt="c.flags.alt || ('Flag of ' + c.name.common)"
                :src="c.flags.svg || c.flags.png"
                class="w-12 h-8 object-cover rounded-sm shadow-sm"
                height="32"
                loading="lazy"
                width="48"
            />
            <div class="min-w-0">
              <div class="font-medium truncate group-hover:underline">{{ c.name.common }}</div>
              <div class="text-xs text-slate-600 truncate">
                {{ c.region || '—' }} / {{ c.capital?.[0] || '—' }}
              </div>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>

    <!-- Empty state -->
    <p v-if="!store.isLoading && !store.error && !store.total" class="mt-6 text-slate-500">
      No results – please adjust your search.
    </p>

    <!-- Pagination -->
    <nav
        v-if="store.totalPages > 1 && store.total > 0"
        aria-label="Pagination"
        class="mt-6 flex items-center justify-center gap-2"
        role="navigation"
    >
      <button
          :disabled="store.page === 1"
          class="btn"
          @click="store.prevPage"
      >
        ← Prev
      </button>

      <span class="text-sm">
        Page {{ store.page }} / {{ store.totalPages }}
      </span>

      <button
          :disabled="store.page === store.totalPages"
          class="btn"
          @click="store.nextPage"
      >
        Next →
      </button>
    </nav>
  </section>
</template>
