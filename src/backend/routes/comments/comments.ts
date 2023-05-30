interface Comment {
    id: string
    content: string
    postId: string
    createdAt: Date
}

class CommentController {
    private comments: Comment[] = []

    getAllCommentsForPost(postId: string): Comment[] {
        return this.comments.filter((comment) => comment.postId === postId)
    }

    createComment(comment: Comment): Comment {
        const newComment: Comment = {
            id: Math.random().toString(),
            content: comment.content,
            postId: comment.postId,
            createdAt: new Date(),
        }

        this.comments.push(newComment)
        return newComment
    }

    updateComment(commentId: string, updatedContent: string): Comment | null {
        const comment = this.comments.find(
            (comment) => comment.id === commentId,
        )

        if (!comment) {
            return null // Comment not found
        }

        comment.content = updatedContent
        return comment
    }

    deleteComment(commentId: string): boolean {
        const commentIndex = this.comments.findIndex(
            (comment) => comment.id === commentId,
        )

        if (commentIndex === -1) {
            return false // Comment not found
        }

        this.comments.splice(commentIndex, 1)
        return true
    }
}

const commentController = new CommentController()

const newComment: Comment = {
    id: '',
    content: 'Nowy komentarz.',
    postId: '123',
    createdAt: new Date(),
}

const createdComment = commentController.createComment(newComment)
console.log('Utworzony komentarz:', createdComment)

const commentsForPost = commentController.getAllCommentsForPost('123')
console.log('Wszystkie komentarze:', commentsForPost)

const updatedComment = commentController.updateComment(
    createdComment.id,
    'Zaktualizowana zawartość komentarza',
)
console.log('Zaktualizowany komentarz:', updatedComment)

const isDeleted = commentController.deleteComment(createdComment.id)
console.log('Usunięty komentarz:', isDeleted)
