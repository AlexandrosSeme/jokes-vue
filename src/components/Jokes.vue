<template>
    <div class="w-full max-w-3xl bg-white mx-auto p-6 shadow-md rounded-md">
      <div class="flex justify-center gap-4 mb-6">
        <button id="randomButton" @click="fetchJoke('random')" :class="buttonClass('random')">
          <font-awesome-icon icon="check" class="mr-2" />
          Random
        </button>
        <button id="programmingButton" @click="fetchJoke('programming')" :class="buttonClass('programming')">
          <font-awesome-icon icon="check" class="mr-2" />
          Programming
        </button>
      </div>
      <div v-if="joke" class="bg-gray-50 p-5 rounded-lg shadow-inner">
        <h2 class="text-lg font-semibold mb-2 capitalize text-gray-700">
          {{ joke.type }} Joke
        </h2>
        <p class="text-gray-600 mb-2">
          <span class="mr-2">
            <font-awesome-icon icon="circle-exclamation" class="text-blue-400 info mr-2" />
          </span>{{ joke.setup }}
        </p>
        <p class="font-semibold text-gray-800">
          <span class="mr-2">
            <font-awesome-icon icon="face-smile" class="text-gray-500 mr-2" />
          </span>{{ joke.punchline }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { getProgrammingJokes, getRandomJoke } from '../services/requests'
  
  type JokeType = 'random' | 'programming' | null
  const selected = ref<JokeType>(null)
  const joke = ref<any | null>(null)
  
  async function fetchJoke(type: JokeType) {
    selected.value = type  
    try {
      if (type === 'random') {
        joke.value = await getRandomJoke()
      } else if (type === 'programming') {
        joke.value = await getProgrammingJokes()
      }
      console.log('Joke fetched:', joke.value)
    } catch (error) {
      console.error('Error fetching joke:', error)
    }
  }
  
  function buttonClass(type: JokeType) {
    const base = 'px-4 py-2 rounded-full border font-medium transition-all flex items-center cursor-pointer'
    const isActive = selected.value === type  
    return isActive
      ? `${base} button-active text-white border-transparent`
      : `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-200`
  }
  </script>
  
  <style scoped>
  .button-active {
    background-color: #5d648d;
  }
  .button-active:hover {
    background-color: #4b4f6d;
  }
  
  #randomButton:hover,
  #programmingButton:hover {
    cursor: pointer;
  }
  
  .info {
    color: rgb(45, 104, 240);
  }
  </style>
  