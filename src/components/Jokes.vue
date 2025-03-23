<template>
    <div class="w-full max-w-3xl bg-white mx-auto p-6 shadow-md rounded-md">
      <!-- Toggle Buttons -->
      <div class="flex justify-center gap-4 mb-6">
        <button
          @click="selected = 'random'"
          :class="buttonClass('random')"
        >
          Random
        </button>
  
        <button
          @click="selected = 'programming'"
          :class="buttonClass('programming')"
        >
          Programming
        </button>
      </div>
  
      <!-- Joke Card -->
      <div class="bg-gray-50 p-5 rounded-lg shadow-inner">
        <h2 class="text-lg font-semibold mb-2 capitalize text-gray-700">{{ currentJoke.type }} Joke</h2>
        <p class="text-gray-600 mb-2"><span class="mr-2">ℹ️</span>{{ currentJoke.setup }}</p>
        <p class="font-semibold text-gray-800"><span class="mr-2">😄</span>{{ currentJoke.punchline }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const selected = ref<'random' | 'programming'>('random')
  
  const jokes = {
    random: {
      type: 'general',
      setup: 'My older brother always tore the last pages of my comic books, and never told me why.',
      punchline: 'I had to draw my own conclusions.'
    },
    programming: {
      type: 'programming',
      setup: 'How many programmers does it take to change a lightbulb?',
      punchline: "None that's a hardware problem"
    }
  }
  
  const currentJoke = computed(() => jokes[selected.value])
  
  function buttonClass(type: string) {
    console.log(type)
    return [
      'px-4 py-2 rounded-full border font-medium transition-all',
      selected.value === type
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
    ]
  }
  </script>
  