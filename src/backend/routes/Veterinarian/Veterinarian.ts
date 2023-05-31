interface Veterinarian {
    id: string
    name: string
    province: string
    city: string
    services: string[]
    rating: number
}

class VeterinarianController {
    private veterinarians: Veterinarian[] = []

    getAllVeterinarians(): Veterinarian[] {
        return this.veterinarians
    }

    searchVeterinarians(province?: string, city?: string, services?: string[], minRating?: number): Veterinarian[] {
        let filteredVeterinarians = this.veterinarians

        if (province) {
            filteredVeterinarians = filteredVeterinarians.filter((vet) => vet.province.toLowerCase() === province.toLowerCase())
        }

        if (city) {
            filteredVeterinarians = filteredVeterinarians.filter((vet) => vet.city.toLowerCase() === city.toLowerCase())
        }

        if (services) {
            filteredVeterinarians = filteredVeterinarians.filter((vet) => services.every((service) => vet.services.includes(service)))
        }

        if (minRating) {
            filteredVeterinarians = filteredVeterinarians.filter((vet) => vet.rating >= minRating)
        }

        return filteredVeterinarians
    }
}

const veterinarianController = new VeterinarianController()

const searchFilters: {
    province?: string
    city?: string
    services?: string[]
    minRating?: number
} = {
    province: 'Mazowieckie',
    city: 'Warszawa',
    services: ['Vaccinations'],
    minRating: 4.0,
}

const searchResults: Veterinarian[] = veterinarianController.searchVeterinarians(searchFilters.province, searchFilters.city, searchFilters.services, searchFilters.minRating)

console.log('Wyniki wyszukiwania:', searchResults)
