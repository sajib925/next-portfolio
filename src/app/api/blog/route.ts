import { prisma } from '@/src/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        tags: true,
        readTime: true,
        createdAt: true,
        views: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Verify authentication (implementation would depend on your auth setup)

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        imageAlt: data.imageAlt,
        published: data.published || true,
        featured: data.featured || false,
        tags: data.tags || [],
        readTime: data.readTime || 5,
        userId: data.userId, 
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
