import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub',
      name: 'github',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
      name: 'linkedin',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com',
      label: 'Twitter',
      name: 'twitter',
    },
    {
      icon: Mail,
      href: 'mailto:contact@example.com',
      label: 'Email',
      name: 'email',
    },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-muted-foreground">
              A professional portfolio showcasing projects, blog posts, and expertise
              in full-stack development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/projects" className="block text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Icon size={24} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {currentYear} All rights reserved. Crafted with care.
          </p>
        </div>
      </div>
    </footer>
  )
}
