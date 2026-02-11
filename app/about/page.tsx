import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'About',
  description: 'Learn more about my background, skills, and experience.',
}

export default function About() {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'GraphQL'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'Vercel', 'AWS', 'Figma'],
    },
  ]

  const experience = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description:
        'Leading development of scalable web applications using modern technologies and best practices.',
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client projects with React, Node.js, and PostgreSQL.',
    },
    {
      title: 'Junior Developer',
      company: 'Startup',
      period: '2018 - 2020',
      description: 'Started career building features and fixing bugs across the full stack.',
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-foreground">About Me</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with a love for building beautiful, functional web
              applications. With over 5 years of experience, I've worked with startups and established
              companies to create digital solutions that make an impact.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Background */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Background</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  My journey in tech started during college when I built my first website. That initial
                  curiosity evolved into a passion for creating elegant solutions to complex problems. I
                  believe that great code isn't just about functionality—it's about crafting experiences
                  that users love.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Throughout my career, I've learned that the best products come from understanding both
                  the technical constraints and the human needs. I focus on writing clean, maintainable
                  code while staying curious about emerging technologies and best practices.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Skills &amp; Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category} className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Experience</h2>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <Card key={index} className="p-6 border-l-4 border-l-primary">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    <p className="text-primary font-medium mb-3">{job.company}</p>
                    <p className="text-muted-foreground">{job.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-secondary/50 p-8 rounded-lg border border-border">
              <h2 className="text-3xl font-bold mb-6 text-foreground">My Philosophy</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Write code that's easy to understand and maintain</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Prioritize user experience and performance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Continuously learn and adapt to new technologies</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Collaborate openly and communicate effectively</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
