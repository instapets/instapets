interface Post {
    id: string
    pictureUrl: string
    description: string
    location: string
    time: Date
}

class PostController {
    private posts: Post[] = []

    // Get all posts
    getAllPosts(): Post[] {
        return this.posts
    }

    // Add a new post
    addPost(post: Post): Post {
        const newPost = { ...post, id: Math.random().toString() }
        this.posts.push(newPost)
        return newPost
    }
}

const postController = new PostController()

// Get all posts
const allPosts = postController.getAllPosts()
console.log('Posty:', allPosts)

// Add a new post
const newPost: Post = {
    id: '',
    pictureUrl: 'https://example.com/animal-picture.jpg',
    description: 'Ładne zwierze',
    location: 'Zoo',
    time: new Date(),
    // Add any other properties specific to your post object
}
const addedPost = postController.addPost(newPost)
console.log('Dodane posty:', addedPost)

// Get all posts again to see the updated list
const updatedPosts = postController.getAllPosts()
console.log('Zaktualizowane posty:', updatedPosts)
