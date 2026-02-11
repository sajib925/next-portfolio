import { prisma } from '@/src/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { position: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        imageAlt: true,
        tags: true,
        featured: true,
        liveUrl: true,
        githubUrl: true,
        createdAt: true,
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Verify authentication (implementation would depend on your auth setup)
    // For now, we'll assume only authenticated users can create projects

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        image: data.image,
        imageAlt: data.imageAlt,
        tags: data.tags || [],
        skills: data.skills || [],
        featured: data.featured || false,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        published: data.published || true,
        position: data.position || 0,
        userId: data.userId, // This should come from authenticated user
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
