import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react'
import { Navigation } from '@/src/components/Navigation'
import { Footer } from '@/src/components/Footer'

export default function Home() {
  const features = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Building scalable applications with modern technologies and best practices.',
    },
    {
      icon: Layers,
      title: 'Clean Architecture',
      description: 'Designing systems with thoughtful separation of concerns and maintainability.',
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Optimizing for speed, efficiency, and delivering excellent user experiences.',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground text-balance">
                Creative Developer &amp; Designer
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto">
                I craft beautiful, pixel-perfect digital experiences that blend thoughtful
                design with robust engineering. Let&apos;s build something extraordinary together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              What I Bring to Your Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="p-6 rounded-lg border border-border bg-background hover:bg-card transition-colors"
                  >
                    <Icon className="text-primary mb-4" size={32} />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-foreground">
              Ready to Start a Project?
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you need a website redesign, a new application, or just want to chat about
              ideas, I&apos;d love to hear from you.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Me Today
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
