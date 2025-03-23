<template>
    <div class="w-full max-w-3xl bg-white mx-auto p-6 shadow-md rounded-md relative">
        <font-awesome-icon @click="addJoke(joke)" icon="heart-circle-plus"
            class="absolute top-4 right-4 text-red-500 text-2xl cursor-pointer z-10" />
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
    <div class="mt-10 overflow-x-auto w-full max-w-3xl bg-white mx-auto p-6 shadow-md rounded-md relative">
        <h1 class="text-3xl font-bold mb-5 text-gray-500 text-center w-full">Favorite Jokes</h1>
        <table class="w-full table-auto border border-gray-300 rounded-md shadow-sm">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-2 py-2 text-left text-gray-500">Type</th>
                    <th class="px-2 py-2 text-left text-gray-500">Setup</th>
                    <th class="px-2 py-2 text-left text-gray-500">Punchline</th>
                    <th class="px-2 py-2 text-center text-gray-500">Rating</th>
                    <th class="px-2 py-2 text-center text-gray-500">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(joke, index) in tableJokes" class="border-t hover:bg-gray-50 transition cursor-pointer">
                    <td class="px-2 py-2 capitalize">{{ joke.type }}</td>
                    <td class="px-2 py-2">{{ joke.setup }}</td>
                    <td class="px-2 py-2">{{ joke.punchline }}</td>
                    <td class="px-2 py-2 text-center stars">
                        <font-awesome-icon v-for="star in 5" :icon="joke.rating >= star ? 'star' : 'star-half-alt'"
                            class="cursor-pointer text-yellow-500 mx-0.5" @click="setRating(joke, star)" />
                    </td>
                    <td class="px-2 py-2 text-center">
                        <button class="text-red-600 hover:text-red-800 transition  cursor-pointer"
                            @click="removeJoke(joke.id)">
                            <font-awesome-icon icon="trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getProgrammingJokes, getRandomJoke } from '../services/requests'
import Swal from 'sweetalert2'

type JokeType = 'random' | 'programming' | null
const selected = ref<JokeType>(null)
const joke = ref<any | null>(null)
const tableJokes = ref<any[]>([]);
type RatedJoke = { id: number; type: string; setup: string; punchline: string; rating?: number }

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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to fetch joke. Please try again later.',
            confirmButtonColor: '#d33'
        })
    }
}

function buttonClass(type: JokeType) {
    const base = 'px-4 py-2 rounded-full border font-medium transition-all flex items-center cursor-pointer'
    const isActive = selected.value === type
    return isActive
        ? `${base} button-active text-white border-transparent`
        : `${base} bg-white text-gray-700 border-gray-300 hover:bg-gray-200`
}

function addJoke(joke: RatedJoke) {
    if (joke != null) {
        const exists = tableJokes.value.find(existing => existing.id === joke.id)
        if (!exists) {
            tableJokes.value.push({ ...joke, rating: 0 })
        } else {
            console.log('Already exist')
            Swal.fire({
                icon: 'info',
                title: 'Already exists',
                text: 'This joke is already in your favorites!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#6366f1'
            })

        }
    } else {
        console.log('Choose one Joke Category')
        Swal.fire({
            icon: 'warning',
            title: 'No category selected',
            text: 'Please select a joke category first!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
        })

    }
}


function setRating(joke: RatedJoke, rating: number) {
    const index = tableJokes.value.findIndex(el => el.id === joke.id)
    if (index !== -1) {
        tableJokes.value[index].rating = rating
    }
}
function removeJoke(id: number) {
    tableJokes.value = tableJokes.value.filter(joke => joke.id !== id)
}

onMounted(() => {
    const saved = localStorage.getItem('favoriteJokes')
    if (saved) {
        tableJokes.value = JSON.parse(saved)
    }
})

watch(tableJokes, (newJokes) => {
    localStorage.setItem('favoriteJokes', JSON.stringify(newJokes))
}, { deep: true })

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

.stars {
    width: 20%;
}
</style>