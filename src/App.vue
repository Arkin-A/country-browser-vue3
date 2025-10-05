<template>
  <div class="min-h-screen bg-gray-50 text-slate-900 flex flex-col items-center p-0">
    <a href="#main" class="skip-link">Skip to main content</a>

    <header
        class="app-header top-0"
        role="banner"
    >
      <div class="container px-4 h-14 flex items-center justify-center">
        <h1 class="text-lg font-semibold">Country Browser</h1>
      </div>
    </header>

    <main id="main" tabindex="-1" class="w-full max-w-4xl p-6">
      <RouterView/>
    </main>
  </div>
</template>

<script lang="ts" setup>
</script>
