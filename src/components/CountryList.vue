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
  <section class="w-full mx-auto p-4">
    <!-- Header & search field -->
    <header class="w-full text-center mb-8">
      <h1 class="text-2xl font-semibold mb-4">Country Browser</h1>

      <input
          v-model="q"
          aria-label="Country search"
          class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Search (e.g. Germany, Berlin, Europe)…"
          type="search"
      />

      <p class="mt-2 text-sm text-slate-500">
        {{ store.total }} countries found
      </p>
    </header>

    <!-- Status messages -->
    <div v-if="store.isLoading" class="text-slate-500">Loading data…</div>
    <div v-else-if="store.error" class="text-red-600">Error: {{ store.error }}</div>

    <!-- Country list -->
    <ul
        v-else
        aria-label="Country list"
        class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
    >
      <li
          v-for="c in store.paged"
          :key="c.cca3 || c.name.common"
          class="p-3 border rounded-md bg-white flex items-center gap-3 hover:shadow transition"
      >

        <img
            :alt="c.flags.alt || ('Flag of ' + c.name.common)"
            :src="c.flags.svg || c.flags.png"
            class="w-8 h-6"
            height="24"
            loading="lazy"
            width="32"
        />

        <div class="text-left">
          <div class="font-medium">{{ c.name.common }}</div>
          <div class="text-xs text-slate-600">
            {{ c.region || '—' }} / {{ c.capital?.[0] || '—' }}
          </div>
        </div>

      </li>
    </ul>

    <!-- Empty state -->
    <p v-if="!store.isLoading && !store.error && !store.total" class="mt-6 text-slate-500">
      No results – please adjust your search.
    </p>

    <!-- Pagination -->
    <nav
        aria-label="Pagination"
        class="mt-6 flex items-center justify-center gap-2"
        role="navigation"
    >
      <button
          :disabled="store.page === 1"
          class="px-3 py-1 rounded border disabled:opacity-50"
          @click="store.prevPage"
      >
        Prev
      </button>

      <span class="text-sm">
        Page {{ store.page }} / {{ store.totalPages }}
      </span>

      <button
          :disabled="store.page === store.totalPages"
          class="px-3 py-1 rounded border disabled:opacity-50"
          @click="store.nextPage"
      >
        Next
      </button>
    </nav>
  </section>
</template>
