export interface Post {
   _id: string;
    title?: string;
    illustration?: string;
    content?: string;
    subtitle?: string;
    createdAt?: Date;
    updatedAt?: Date;
    published: boolean;
}

export interface CreatePost extends Post {
    authorId?: string;
}

export interface UpdatePost {
    id: string;
    post: Post;
}