'use client'

import { Card } from '@/src/components/ui/card'
import { Badge } from '@/src/components/ui/badge'
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Navigation } from '@/src/components/Navigation'
import { Footer } from '@/src/components/Footer'

interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  readTime: number
  createdAt: string
  user: {
    name: string
    avatar?: string
  }
}

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog post')
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Failed to load blog post. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading blog post...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <Navigation />
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{error || 'Blog post not found'}</p>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Back Button */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/50 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays size={18} />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={18} />
                {post.readTime} min read
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-invert">
            {post.content ? (
              <div
                className="text-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            ) : (
              <p className="text-muted-foreground">{post.excerpt}</p>
            )}
          </div>
        </article>

        {/* Author Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/50">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                {post.user.avatar && (
                  <img
                    src={post.user.avatar || "/placeholder.svg"}
                    alt={post.user.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {post.user.name}
                  </h3>
                  <p className="text-muted-foreground">Author</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-foreground">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    Coming Soon
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    More articles are being prepared. Stay tuned!
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
