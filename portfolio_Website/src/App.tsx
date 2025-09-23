import { useEffect, useMemo, useState } from 'react'
import { admin as adminConfig, initialProjects, site, skills, type Project } from './content'

// Admin Form Component
function AdminForm({ 
  isOpen, 
  onClose, 
  onSave,
  portfolioData,
  portfolioSkills,
  aboutText
}: { 
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    name: string
    role: string
    heroTitle: string
    heroSubtitle: string
    email: string
    linkedin: string
    location: string
    availability: string
    focus: string
    skills: string
    aboutText: string
    phone: string
  }) => void
  portfolioData: (typeof site) & { contactPhone?: string }
  portfolioSkills: string[]
  aboutText: string
}) {
  const [formData, setFormData] = useState({
    name: portfolioData.title.split(' — ')[0],
    role: portfolioData.role,
    heroTitle: portfolioData.heroTitle,
    heroSubtitle: portfolioData.heroSubtitle,
    email: portfolioData.contactEmail,
    linkedin: portfolioData.linkedinUrl,
    location: portfolioData.quickFacts[0].replace('Location: ', ''),
    availability: portfolioData.quickFacts[1].replace('Availability: ', ''),
    focus: portfolioData.quickFacts[2].replace('Focus: ', ''),
    skills: portfolioSkills.join(', '),
    aboutText: aboutText,
    phone: portfolioData.contactPhone ?? ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Edit Portfolio Information</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Update your personal information and skills
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Description</label>
            <textarea
              value={formData.heroSubtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">About Section</label>
            <textarea
              value={formData.aboutText}
              onChange={(e) => setFormData(prev => ({ ...prev, aboutText: e.target.value }))}
              rows={4}
              placeholder="Write about yourself, your experience, and what you do..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g. +92 300 1234567"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Availability</label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Focus</label>
              <input
                type="text"
                value={formData.focus}
                onChange={(e) => setFormData(prev => ({ ...prev, focus: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
              rows={2}
              placeholder="React, TypeScript, Node.js, Express..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Project Edit Form Component
function ProjectEditForm({ 
  project, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: Project) => void
}) {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    tags: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (project) {
      setFormData(project)
    }
  }, [project])

  if (!isOpen || !project) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Edit Project</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Update project information
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              placeholder="Enter project description. Each sentence will be converted to a bullet point automatically."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Tip: Write each point as a separate sentence. They will be displayed as bullet points.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
              }))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
            <input
              type="url"
              value={formData.imageUrl || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return { isDark, setIsDark }
}

function App() {
  const { isDark, setIsDark } = useDarkMode()
  const [admin, setAdmin] = useState(false)
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [showProjectEdit, setShowProjectEdit] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showPhone, setShowPhone] = useState(false)
  
  // Load saved portfolio data from localStorage
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData')
    return saved ? JSON.parse(saved) : site
  })
  
  const [portfolioSkills, setPortfolioSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('portfolioSkills')
    return saved ? JSON.parse(saved) : skills
  })
  
  const [aboutText, setAboutText] = useState(() => {
    const saved = localStorage.getItem('aboutText')
    return saved || "I am a developer focused on building fast, accessible, and maintainable web apps. I enjoy designing APIs, optimizing databases, and shipping pixel-perfect UIs."
  })
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const local = localStorage.getItem('projects')
    return local ? (JSON.parse(local) as Project[]) : initialProjects
  })

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        const pin = window.prompt('Enter admin PIN')
        if (pin === adminConfig.pin) setAdmin((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const accent = useMemo(
    () => (isDark ? 'from-primary-600 to-primary-400' : 'from-primary-500 to-primary-400'),
    [isDark]
  )

  const handleAdminFormSave = (data: {
    name: string
    role: string
    heroTitle: string
    heroSubtitle: string
    email: string
    linkedin: string
    location: string
    availability: string
    focus: string
    skills: string
    aboutText: string
    phone: string
  }) => {
    // Update content.ts with new data
    const updatedContent = {
      ...site,
      title: `${data.name} — Portfolio`,
      role: data.role,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      contactEmail: data.email,
      linkedinUrl: data.linkedin,
      quickFacts: [
        `Location: ${data.location}`,
        `Availability: ${data.availability}`,
        `Focus: ${data.focus}`
      ],
      contactPhone: data.phone
    }
    
    // Save to localStorage and update state
    localStorage.setItem('portfolioData', JSON.stringify(updatedContent))
    localStorage.setItem('portfolioSkills', JSON.stringify(data.skills.split(',').map((s: string) => s.trim())))
    localStorage.setItem('aboutText', data.aboutText)
    
    // Update state to reflect changes immediately
    setPortfolioData(updatedContent)
    setPortfolioSkills(data.skills.split(',').map((s: string) => s.trim()))
    setAboutText(data.aboutText)
  }

  const handleProjectEdit = (project: Project) => {
    setEditingProject(project)
    setShowProjectEdit(true)
  }

  const handleProjectSave = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
    setShowProjectEdit(false)
    setEditingProject(null)
  }

  const handleFileUpload = (type: 'cv' | 'coverLetter') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.doc,.docx'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Save file info to localStorage
        const fileInfo = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }
        localStorage.setItem(`${type}Info`, JSON.stringify(fileInfo))
        
        // Convert to base64 and save
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target?.result as string
          localStorage.setItem(`${type}Data`, base64)
          alert(`${type === 'cv' ? 'CV' : 'Cover Letter'} uploaded successfully!`)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleFileDownload = (type: 'cv' | 'coverLetter') => {
    const fileData = localStorage.getItem(`${type}Data`)
    const fileInfo = localStorage.getItem(`${type}Info`)
    
    if (fileData && fileInfo) {
      const info = JSON.parse(fileInfo)
      const link = document.createElement('a')
      link.href = fileData
      link.download = info.name
      link.click()
    } else {
      alert(`${type === 'cv' ? 'CV' : 'Cover Letter'} not found. Please upload first.`)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="container-responsive flex items-center justify-between h-16">
          <a href="#" className="font-extrabold tracking-tight text-2xl text-primary-600">
            {portfolioData.title.split(' — ')[0]}
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-primary-600">
              About
            </a>
            <a href="#skills" className="hover:text-primary-600">
              Skills
            </a>
            <a href="#projects" className="hover:text-primary-600">
              Projects
            </a>
            <a href="#contact" className="hover:text-primary-600">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Toggle theme" className="btn-ghost" onClick={() => setIsDark(!isDark)}>
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${accent} opacity-10`} />
        <div className="container-responsive py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold">{portfolioData.role}</p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">
              {portfolioData.heroTitle}
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{portfolioData.heroSubtitle}</p>
            <div className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-200">
              {portfolioData.title.split(' — ')[0]}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#projects" className="btn-primary w-full sm:w-auto text-center">
                View Projects
              </a>
              <button 
                onClick={() => handleFileDownload('cv')}
                className="btn-primary bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-center"
              >
                📄 Download CV
              </button>
              <button 
                onClick={() => handleFileDownload('coverLetter')}
                className="btn-primary bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-center"
              >
                📝 Download Cover Letter
              </button>
              {admin && (
                <>
                  <button 
                    onClick={() => handleFileUpload('cv')}
                    className="btn-ghost w-full sm:w-auto text-center"
                  >
                    Upload CV
                  </button>
                  <button 
                    onClick={() => handleFileUpload('coverLetter')}
                    className="btn-ghost w-full sm:w-auto text-center"
                  >
                    Upload Cover Letter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-responsive py-16 sm:py-24">
        <div className="grid sm:grid-cols-5 gap-10">
          <div className="sm:col-span-3">
            <h2 className="text-2xl sm:text-3xl font-bold">About</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {aboutText}
            </p>
          </div>
          <div className="sm:col-span-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <h3 className="font-semibold">Quick Facts</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {portfolioData.quickFacts.map((q: string) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container-responsive py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {portfolioSkills.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-slate-700 dark:text-slate-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container-responsive py-16 sm:py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
          {admin && (
            <div className="flex gap-2">
              <button
                className="btn-primary"
                onClick={() => setShowAdminForm(true)}
              >
                Edit Info
              </button>
              <button
                className="btn-ghost"
                onClick={() => {
                  const title = window.prompt('Project title?')?.trim()
                  if (!title) return
                  const description = window.prompt('Short description?')?.trim() || ''
                  const tagsRaw = window.prompt('Tags (comma separated)?')?.trim() || ''
                  const githubUrl = window.prompt('GitHub URL (optional)?')?.trim() || undefined
                  const liveUrl = window.prompt('Live URL (optional)?')?.trim() || undefined
                  const imageUrl = window.prompt('Image URL (optional)?')?.trim() || undefined
                  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []
                  const newProj: Project = {
                    id: `p-${Date.now()}`,
                    title,
                    description,
                    tags,
                    githubUrl,
                    liveUrl,
                    imageUrl,
                  }
                  setProjects((prev) => [newProj, ...prev])
                }}
              >
                Add Project
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white/60 dark:bg-slate-900/60"
            >
              {p.imageUrl && (
                <div className="aspect-video bg-slate-100 dark:bg-slate-800">
                  <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  {admin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleProjectEdit(p)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-lg font-bold px-1"
                        title="Edit project"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${p.title}"?`)) {
                            setProjects(prev => prev.filter(project => project.id !== p.id))
                          }
                        }}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xl font-bold px-1"
                        title="Delete project"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {p.description.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                    <div key={index} className="flex items-start gap-2 mb-1">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{sentence.trim()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {p.githubUrl && (
                    <a className="btn-ghost text-sm" href={p.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {p.liveUrl && (
                    <a className="btn-ghost text-sm" href={p.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {admin && (
          <div className="mt-8 flex gap-3">
            <button
              className="btn-ghost"
              onClick={() => {
                const json = JSON.stringify(projects, null, 2)
                navigator.clipboard.writeText(json)
                alert('Projects JSON copied to clipboard. Paste into your code repo config.')
              }}
            >
              Copy Projects JSON
            </button>
            <button
              className="btn-ghost text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              onClick={() => {
                if (window.confirm(`Delete all ${projects.length} projects? This cannot be undone.`)) {
                  setProjects([])
                }
              }}
            >
              Delete All Projects
            </button>
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="container-responsive py-16 sm:py-24">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/60">
          <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Want to collaborate or hire? I would love to chat.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn-primary" href={`mailto:${portfolioData.contactEmail}`}>
              Email Me
            </a>
            <a className="btn-ghost" href={portfolioData.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            {(portfolioData as any).contactPhone && (
              <button className="btn-ghost" onClick={() => setShowPhone((v) => !v)}>
                {showPhone ? 'Hide Phone' : 'Show Phone'}
              </button>
            )}
          </div>
          {showPhone && (portfolioData as any).contactPhone && (
            <div className="mt-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 inline-flex items-center gap-3">
              <span className="font-semibold">Phone:</span>
              <a className="text-primary-600" href={`tel:${(portfolioData as any).contactPhone}`}>
                {(portfolioData as any).contactPhone}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-responsive h-16 flex items-center justify-between text-sm">
          <span>© {new Date().getFullYear()} Rian Riasat</span>
          <span className="text-slate-500">Built with React + TailwindCSS</span>
        </div>
      </footer>

      {admin && (
        <div className="fixed bottom-4 right-4 z-50">
          <span className="tag">Admin Mode</span>
        </div>
      )}

      {/* Admin Form Modal */}
      <AdminForm
        isOpen={showAdminForm}
        onClose={() => setShowAdminForm(false)}
        onSave={handleAdminFormSave}
        portfolioData={portfolioData}
        portfolioSkills={portfolioSkills}
        aboutText={aboutText}
      />

      {/* Project Edit Form Modal */}
      <ProjectEditForm
        project={editingProject}
        isOpen={showProjectEdit}
        onClose={() => {
          setShowProjectEdit(false)
          setEditingProject(null)
        }}
        onSave={handleProjectSave}
      />
    </div>
  )
}

export default App
