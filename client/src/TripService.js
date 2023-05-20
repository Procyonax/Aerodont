const baseURL = 'http://localhost:9000/api/trips/'

export const getTrips = () => {
    return fetch(baseURL)
        .then(res => res.json())
}