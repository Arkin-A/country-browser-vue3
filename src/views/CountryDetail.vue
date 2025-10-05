<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useCountriesStore} from '@/stores/countries'

const route = useRoute()
const router = useRouter()
const store = useCountriesStore()

const code = computed(() => String(route.params.code || '').toUpperCase())

onMounted(async () => {
  if (!store.all.length && !store.isLoading) await store.load()
})

const country = computed(() =>
    store.all.find(c => (c.cca3 ?? c.cca2 ?? '').toUpperCase() === code.value)
)

function goBack() {
  router.push({name: 'home'})
}

</script>

<template>
  <section class="w-full max-w-3xl mx-auto p-4">

    <div v-if="store.isLoading" class="text-slate-500">Loading…</div>
    <div v-else-if="store.error" class="text-red-600">Error: {{ store.error }}</div>
    <div v-else-if="!country" class="text-slate-500">No country found.</div>

    <article
        v-else
        class="grid gap-6 sm:grid-cols-[180px_1fr] items-start p-6 border rounded-xl bg-white shadow-sm"
    >
      <img
          :alt="country.flags.alt || ('Flag of ' + country.name.common)"
          :src="country.flags.svg || country.flags.png"
          class="w-40 h-28 object-cover rounded"
          loading="lazy"
      />

      <div>
        <h1 class="text-2xl font-semibold">{{ country.name.common }}</h1>
        <p class="text-slate-600">{{ country.name.official }}</p>

        <dl class="mt-4 grid grid-cols-[120px_1fr] gap-y-2">
          <dt class="text-slate-500">Region</dt>
          <dd>{{ country.region || '—' }}</dd>

          <dt class="text-slate-500">Capital</dt>
          <dd>{{ country.capital?.join(', ') || '—' }}</dd>

          <dt class="text-slate-500">Population</dt>
          <dd>{{ country.population?.toLocaleString() || '—' }}</dd>

          <dt class="text-slate-500">CCA3</dt>
          <dd>{{ country.cca3 || '—' }}</dd>
        </dl>
      </div>
    </article>
    <button
        aria-label="Back to list"
        class="mt-4 btn"
        @click="goBack"
    >
      ← Back
    </button>
  </section>
</template>
