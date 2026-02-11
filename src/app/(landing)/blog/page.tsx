'use client'

import { Card } from '@/src/components/ui/card'
import { Badge } from '@/src/components/ui/badge'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { Navigation } from '@/src/components/Navigation'
import { Footer } from '@/src/components/Footer'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  tags: string[]
  readTime: number
  createdAt: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
        // Fallback to demo posts
        setPosts([
          {
            id: '1',
            slug: 'getting-started-with-nextjs',
            title: 'Getting Started with Next.js 14',
            excerpt:
              'A comprehensive guide to setting up a modern Next.js project with TypeScript, Tailwind CSS, and best practices.',
            tags: ['Next.js', 'React', 'TypeScript'],
            readTime: 8,
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            slug: 'building-scalable-databases',
            title: 'Building Scalable Database Architectures',
            excerpt:
              'Tips and tricks for designing PostgreSQL databases that can handle millions of queries efficiently.',
            tags: ['PostgreSQL', 'Architecture', 'Backend'],
            readTime: 12,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            slug: 'react-performance-optimization',
            title: 'React Performance Optimization Techniques',
            excerpt:
              'Deep dive into memoization, code splitting, and lazy loading to make your React apps lightning fast.',
            tags: ['React', 'Performance', 'Frontend'],
            readTime: 10,
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-foreground">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on web development, design, and technology. I write about things I learn and
              techniques I find useful.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 grow line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            {formatDate(post.createdAt)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {post.readTime} min read
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
