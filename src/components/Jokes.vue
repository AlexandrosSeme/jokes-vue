<template>
    <div class="w-full max-w-3xl bg-white mx-auto p-6 shadow-md rounded-md">
        <div class="flex justify-center gap-4 mb-6">
            <button id="randomButton" @click="randomJoke('random')" :class="buttonClass('random')">
                <font-awesome-icon icon="check" class="mr-2" />
                Random
            </button>
            <button id="programmingButton" @click="randomJoke('programming')" :class="buttonClass('programming')">
                <font-awesome-icon icon="check" class="mr-2" />
                Programming
            </button>
        </div>
        <div v-if="selected" class="bg-gray-50 p-5 rounded-lg shadow-inner">
            <h2 class="text-lg font-semibold mb-2 capitalize text-gray-700">
                {{ currentJoke.type }} Joke
            </h2>
            <p class="text-gray-600 mb-2">
                <span class="mr-2"> <font-awesome-icon icon="circle-exclamation" class="text-blue-400 info mr-2" /></span>{{ currentJoke.setup }}
            </p>
            <p class="font-semibold text-gray-800">
                <span class="mr-2"> <font-awesome-icon icon="face-smile" class="text-gray-500 mr-2" /></span>{{ currentJoke.punchline }}
            </p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
type JokeType = 'random' | 'programming' | null
const selected = ref<JokeType>(null)
const jokes = {
    random: {
        type: 'general',
        setup: 'My older brother always tore the last pages of my comic books, and never told me why.',
        punchline: 'I had to draw my own conclusions.'
    },
    programming: {
        type: 'programming',
        setup: 'How many programmers does it take to change a lightbulb?',
        punchline: "None — that's a hardware problem"
    }
}

const currentJoke = computed(() => {
    return selected.value ? jokes[selected.value] : { type: '', setup: '', punchline: '' }
});

function randomJoke(type: JokeType) {
    selected.value = type
    console.log('clicked:', type)
}

function buttonClassbck(type: JokeType) {
    const disabled = 'px-4 py-2 rounded-full border font-medium transition-all flex items-center'
    const isActive = selected.value === type
    return isActive
        ? `${disabled} bg-blue-600 text-white border-blue-600`
        : `${disabled} bg-white text-blue-600 border-blue-600 hover:bg-blue-50`
}

function buttonClass(type: JokeType) {
  const base = 'px-4 py-2 rounded-full border font-medium transition-all flex items-center cursor-pointer'
  const isActive = selected.value === type

  return isActive
    ? `${base} button-active text-white border-transparent`
    : `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-200`
}
</script>

<style>
.button-active {
  background-color: #5d648d ;
}

.button-active:hover {
  background-color: #5d648d ;
}

#randomButton:hover {
    cursor: pointer;
}

#programmingButton:hover {
    cursor: pointer;
}
.info{
    color: rgb(45, 104, 240);
}
</style>