interface Message {
    id: string
    sender: string
    content: string
    timestamp: Date
}

class ChatController {
    private messages: Message[] = []

    // Get all messages
    getAllMessages(): Message[] {
        return this.messages
    }

    // Add a new message to the chat
    addMessage(message: Message): Message {
        const newMessage = { ...message, id: Math.random().toString() }
        this.messages.push(newMessage)
        return newMessage
    }
}

const chatController = new ChatController()

// Get all messages
const allMessages = chatController.getAllMessages()
console.log('Wszystkie wiadomości:', allMessages)

// Add a new message
const newMessage: Message = {
    id: '',
    sender: 'John',
    content: 'Hello, world!',
    timestamp: new Date(),
}
const addedMessage = chatController.addMessage(newMessage)
console.log('Dodana wiadomość:', addedMessage)

// Get all messages again to see the updated list
const updatedMessages = chatController.getAllMessages()
console.log('Zaktualizowana wiadomość:', updatedMessages)
