<template>
  <div class="min-h-screen bg-gray-50 text-slate-900 flex flex-col items-center p-0">
    <header
        class="app-header top-0"
        role="banner"
    >
      <div class="container px-4 h-14 flex items-center justify-center">
        <span class="text-lg font-semibold">Country Browser</span>
      </div>
    </header>

    <main class="w-full max-w-4xl p-6">
      <RouterView/>
    </main>
  </div>
</template>

<script lang="ts" setup>
</script>
