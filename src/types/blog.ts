
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: Author;
  category: string;
  tags: string[];
  popular: boolean;
  commentCount: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: Author;
  createdAt: string;
  parentId?: string;
  likes: number;
}
