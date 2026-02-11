'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch projects from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        // Fallback to demo projects
        setProjects([
          {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform built with Next.js and Stripe integration.',
            tags: ['React', 'Next.js', 'Stripe', 'PostgreSQL'],
            featured: true,
          },
          {
            id: '2',
            title: 'Content Management System',
            description: 'A headless CMS with rich text editing capabilities and real-time collaboration.',
            tags: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
            featured: true,
          },
          {
            id: '3',
            title: 'Analytics Dashboard',
            description: 'Real-time analytics dashboard with interactive charts and data visualizations.',
            tags: ['React', 'D3.js', 'API', 'TypeScript'],
            featured: false,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-foreground">My Projects</h1>
            <p className="text-xl text-muted-foreground">
              A selection of projects I've built and contributed to, showcasing my expertise
              in full-stack development.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="mb-20">
                <h2 className="text-3xl font-bold mb-12 text-foreground">Featured Work</h2>
                <div className="space-y-8">
                  {featuredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {project.image && (
                          <div className="bg-secondary/50 rounded-lg h-64 md:h-auto flex items-center justify-center">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            {project.liveUrl && (
                              <Button asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink size={18} className="mr-2" />
                                  View Live
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button asChild variant="outline">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github size={18} className="mr-2" />
                                  Source Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-12 text-foreground">Other Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="p-6 flex flex-col hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button asChild size="sm" className="flex-1">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} className="mr-1" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github size={16} className="mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            )}

            {!loading && projects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No projects yet. Check back soon!</p>
                <p className="text-sm text-muted-foreground">
                  In the meantime, check out my{' '}
                  <Link href="/blog" className="text-primary hover:underline">
                    blog
                  </Link>{' '}
                  for insights on web development.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
