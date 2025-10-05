<template>
  <div class="min-h-screen bg-gray-50 text-slate-900 flex flex-col items-center p-6">
    <main class="w-full max-w-4xl">
      <CountryList/>
    </main>
  </div>
</template>

<script lang="ts" setup>
import CountryList from '@/components/CountryList.vue'
</script>
