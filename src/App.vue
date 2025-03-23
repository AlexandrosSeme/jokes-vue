<script setup>
import Jokes from './components/Jokes.vue'
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 flex flex-col items-center pt-10 px-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center w-full">Select Joke Category</h1>
    <Jokes class="w-full" />
  </div>
</template>
