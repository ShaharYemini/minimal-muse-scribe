
import { Author, BlogPost, Comment } from "../types/blog";

const authors: Author[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Senior Writer & Tech Enthusiast"
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Creative Director & Lifestyle Blogger"
  }
];

const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: authors[1],
    content: "This is such an insightful post! Thanks for sharing your knowledge.",
    createdAt: "2024-04-15T14:35:00Z"
  },
  {
    id: "2",
    postId: "1",
    author: authors[0],
    content: "I've been working on something similar. Would love to chat more about this topic.",
    createdAt: "2024-04-15T16:42:00Z",
    replies: [
      {
        id: "3",
        postId: "1",
        parentId: "2",
        author: authors[1],
        content: "Absolutely! Feel free to contact me anytime.",
        createdAt: "2024-04-15T17:15:00Z"
      }
    ]
  },
  {
    id: "4",
    postId: "2",
    author: authors[0],
    content: "Great perspectives on this emerging technology!",
    createdAt: "2024-04-16T09:12:00Z"
  }
];

// Generate posts for different timeframes
export const mockPosts: BlogPost[] = [
  // Recent posts
  {
    id: "1",
    title: "The Future of Web Development",
    slug: "the-future-of-web-development",
    excerpt: "Exploring emerging trends and technologies shaping the future of web development landscape.",
    content: `
# The Future of Web Development
      
As we move further into the decade, web development continues to evolve at a rapid pace. From AI-assisted coding to new frameworks, the landscape is constantly shifting.

## AI-Powered Development
Artificial intelligence is revolutionizing how we approach coding. Tools like Lovable AI can now generate entire components or applications based on natural language descriptions, dramatically increasing productivity.

![Web Development](https://images.unsplash.com/photo-1461749280684-dccba630e2f6)

## The Rise of Edge Computing
Edge computing is changing how we deploy applications, bringing computation closer to data sources and reducing latency:

1. Faster response times
2. Reduced bandwidth usage
3. Better performance in remote areas

## WebAssembly Revolution
WebAssembly enables high-performance applications on the web, opening doors to new possibilities:

\`\`\`js
// Example of calling WebAssembly from JavaScript
const importObject = {
  imports: { imported_func: arg => console.log(arg) }
};

WebAssembly.instantiateStreaming(fetch('simple.wasm'), importObject)
.then(obj => obj.instance.exports.exported_func());
\`\`\`

The future is bright for web development, with new tools and technologies making it easier than ever to build fast, responsive, and feature-rich applications.
    `,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    author: authors[0],
    createdAt: "2024-04-16T10:30:00Z",
    updatedAt: "2024-04-16T10:30:00Z",
    tags: ["Web Development", "Future Tech", "AI", "WebAssembly"],
    comments: [comments[0], comments[1]],
    likes: 45,
    views: 1200,
    featured: true
  },
  {
    id: "2",
    title: "Building Responsive Designs with Modern CSS",
    slug: "responsive-designs-modern-css",
    excerpt: "Learn how to create stunning, responsive layouts using the latest CSS features.",
    content: `
# Building Responsive Designs with Modern CSS

Modern CSS has evolved tremendously, offering powerful features for creating responsive designs without relying heavily on JavaScript or external libraries.

## Container Queries

Container queries represent a significant advancement in responsive design, allowing elements to adapt based on their parent container rather than just the viewport size.

![CSS Design](https://images.unsplash.com/photo-1507721999472-8ed4421c4af2)

## CSS Grid and Flexbox

The combination of Grid and Flexbox provides unprecedented layout control:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
\`\`\`

## Custom Properties (CSS Variables)

CSS variables enable more maintainable and dynamic styling:

\`\`\`css
:root {
  --primary-color: #3490dc;
  --secondary-color: #ffed4a;
}

.alert {
  background-color: var(--primary-color);
  color: white;
}
\`\`\`

By mastering these modern techniques, you can create websites that not only look stunning across all devices but are also easier to maintain and update.
    `,
    coverImage: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19",
    author: authors[1],
    createdAt: "2024-04-15T09:20:00Z",
    updatedAt: "2024-04-15T14:15:00Z",
    tags: ["CSS", "Responsive Design", "Web Development"],
    comments: [comments[3]],
    likes: 27,
    views: 985
  },
  // More recent posts
  {
    id: "3",
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    excerpt: "A comprehensive guide to React Hooks and how they can simplify your components.",
    content: "Detailed content about React Hooks...",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    author: authors[0],
    createdAt: "2024-04-14T11:45:00Z",
    updatedAt: "2024-04-14T11:45:00Z",
    tags: ["React", "JavaScript", "Web Development"],
    comments: [],
    likes: 36,
    views: 1100
  },
  // Same date last year
  {
    id: "4",
    title: "TypeScript Best Practices for 2023",
    slug: "typescript-best-practices-2023",
    excerpt: "Discover the most effective ways to use TypeScript in your projects this year.",
    content: "Detailed content about TypeScript best practices...",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    author: authors[1],
    createdAt: "2023-04-17T13:25:00Z",
    updatedAt: "2023-04-18T09:15:00Z",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    comments: [],
    likes: 52,
    views: 1890
  },
  {
    id: "5",
    title: "The Complete Guide to Web Accessibility",
    slug: "complete-guide-web-accessibility",
    excerpt: "Learn how to make your web applications accessible to everyone.",
    content: "Detailed content about web accessibility...",
    coverImage: "https://images.unsplash.com/photo-1581089781785-603411fa81e5",
    author: authors[0],
    createdAt: "2023-04-17T08:50:00Z",
    updatedAt: "2023-04-17T08:50:00Z",
    tags: ["Accessibility", "Web Development", "UI/UX"],
    comments: [],
    likes: 41,
    views: 1450
  },
  // Popular entries
  {
    id: "6",
    title: "10 Performance Tips for Modern Web Apps",
    slug: "performance-tips-modern-web-apps",
    excerpt: "Optimize your web application with these essential performance tips.",
    content: "Detailed content about performance optimization...",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    author: authors[0],
    createdAt: "2024-03-29T14:20:00Z",
    updatedAt: "2024-03-30T11:05:00Z",
    tags: ["Performance", "Optimization", "Web Development"],
    comments: [],
    likes: 89,
    views: 3200
  },
  {
    id: "7",
    title: "Getting Started with Tailwind CSS",
    slug: "getting-started-tailwind-css",
    excerpt: "A beginner's guide to using Tailwind CSS in your projects.",
    content: "Detailed content about Tailwind CSS...",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    author: authors[1],
    createdAt: "2024-02-12T10:40:00Z",
    updatedAt: "2024-02-12T10:40:00Z",
    tags: ["CSS", "Tailwind", "Web Development"],
    comments: [],
    likes: 75,
    views: 2900
  },
  // Random entries
  {
    id: "8",
    title: "Web3 Development: The Essential Toolkit",
    slug: "web3-development-toolkit",
    excerpt: "Explore the tools and technologies you need to start building Web3 applications.",
    content: "Detailed content about Web3 development...",
    coverImage: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    author: authors[0],
    createdAt: "2024-01-22T16:15:00Z",
    updatedAt: "2024-01-23T09:30:00Z",
    tags: ["Web3", "Blockchain", "Ethereum", "Development"],
    comments: [],
    likes: 62,
    views: 2100
  },
  {
    id: "9",
    title: "Advanced Git Workflows for Team Collaboration",
    slug: "advanced-git-workflows-teams",
    excerpt: "Improve your team's productivity with these advanced Git strategies.",
    content: "Detailed content about Git workflows...",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498",
    author: authors[1],
    createdAt: "2023-11-08T11:10:00Z",
    updatedAt: "2023-11-09T14:25:00Z",
    tags: ["Git", "Collaboration", "Development"],
    comments: [],
    likes: 55,
    views: 1850
  },
  {
    id: "10",
    title: "Creating Stunning Animations with CSS and GSAP",
    slug: "animations-css-gsap",
    excerpt: "Learn how to combine CSS and GSAP for beautiful web animations.",
    content: "Detailed content about web animations...",
    coverImage: "https://images.unsplash.com/photo-1550063873-ab792950096b",
    author: authors[0],
    createdAt: "2023-09-19T15:45:00Z",
    updatedAt: "2023-09-20T10:30:00Z",
    tags: ["CSS", "GSAP", "Animations", "Web Development"],
    comments: [],
    likes: 48,
    views: 1680
  }
];

// Helper functions to filter posts
export const getRecentPosts = () => 
  mockPosts.filter(post => new Date(post.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const getSameDateLastYearPosts = () => {
  const today = new Date();
  const lastYear = today.getFullYear() - 1;
  const month = today.getMonth();
  const day = today.getDate();
  
  return mockPosts.filter(post => {
    const postDate = new Date(post.createdAt);
    return postDate.getFullYear() === lastYear && 
           postDate.getMonth() === month && 
           postDate.getDate() === day;
  });
};

export const getPopularPosts = () => 
  [...mockPosts].sort((a, b) => b.views - a.views || b.likes - a.likes).slice(0, 5);

export const getRandomPosts = (count = 3) => {
  const shuffled = [...mockPosts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getPostBySlug = (slug: string) => 
  mockPosts.find(post => post.slug === slug);

export const getFeaturedPosts = () => 
  mockPosts.filter(post => post.featured);
