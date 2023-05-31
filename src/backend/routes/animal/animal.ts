interface Animal {
    id: string
    owner: string
    name: string
    sex: string
    species: string
    weight: number
    height: number
    age: number
    color: string
    desc: string
    image: string
    createdAt: Date
}

class AnimalController {
    private animals: Animal[] = []

    getAllAnimals(): Animal[] {
        return this.animals
    }

    createAnimal(animal: Animal): Animal {
        const newAnimal: Animal = {
            id: Math.random().toString(),
            owner: animal.owner,
            name: animal.name,
            sex: animal.sex,
            species: animal.species,
            weight: animal.weight,
            height: animal.height,
            age: animal.age,
            color: animal.color,
            desc: animal.desc,
            image: animal.image,
            createdAt: new Date(),
        }

        this.animals.push(newAnimal)
        return newAnimal
    }

    updateAnimal(animalId: string, updatedName: string): Animal | null {
        const animal = this.animals.find((animal) => animal.id === animalId)

        if (!animal) {
            return null // Animal not found
        }

        animal.name = updatedName
        return animal
    }

    deleteAnimal(animalId: string): boolean {
        const animalIndex = this.animals.findIndex((animal) => animal.id === animalId)

        if (animalIndex === -1) {
            return false // Animal not found
        }

        this.animals.splice(animalIndex, 1)
        return true
    }
}

const animalController = new AnimalController()

const newAnimal: Animal = {
    id: '',
    owner: 'Szymon',
    name: 'Pimpek',
    sex: 'Samiec',
    species: 'Cat',
    weight: 5.2,
    height: 10,
    age: 2,
    color: 'Czarny',
    desc: 'Fajny kot',
    image: 'cat.jpg',
    createdAt: new Date(),
}

const createdAnimal = animalController.createAnimal(newAnimal)
console.log('Utworzone zwierzę:', createdAnimal)

const allAnimals = animalController.getAllAnimals()
console.log('Wszystkie zwierzęta:', allAnimals)

const updatedAnimal = animalController.updateAnimal(createdAnimal.id, 'Fluffy Updated')

console.log('Zaktualizowane zwierzę:', updatedAnimal)

const isanimalDeleted = animalController.deleteAnimal(createdAnimal.id)

console.log('Usunięte zwierzę:', isanimalDeleted)
