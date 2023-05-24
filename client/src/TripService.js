const baseURL = "http://localhost:9000/api/trips/";

const TripService = {
  addTrip(trip) {
    return fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(trip),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  getTrips() {
    return fetch(baseURL).then((res) => res.json());
  },

  deleteTrip(id) {
    return fetch(baseURL + id, {
      method: "DELETE",
    });
  },
};

export const putTrip = (id, payload) => {
  return fetch(baseURL + id, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

export default TripService;
