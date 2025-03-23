

export async function getRandomJoke(): Promise<any> {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke')
    if (!response.ok) {
        throw new Error('Failed to fetch joke')
    }
    return await response.json();
}

export async function getProgrammingJokes(): Promise<any> {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random')
    if (!response.ok) {
        throw new Error('failed to fetch joke')
    }
    const data = await response.json()
    return data[0];
}