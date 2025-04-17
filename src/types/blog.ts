
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  comments: Comment[];
  likes: number;
  views: number;
  featured?: boolean;
}
