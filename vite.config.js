import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import multer from 'multer'

function localUploadPlugin() {
  return {
    name: 'local-portfolio-upload',
    configureServer(server) {
      const upload = multer({
        storage: multer.diskStorage({
          destination: path.resolve('public/videos'),
          filename: (_request, file, callback) => {
            const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '')
            callback(null, `${Date.now()}-${safeName}`)
          },
        }),
        limits: { fileSize: 500 * 1024 * 1024 },
      })

      const sendJson = (response, statusCode, payload) => {
        response.statusCode = statusCode
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(payload))
      }

      const overridesPath = path.resolve('src/data/projectOverrides.json')
      const readOverrides = () => JSON.parse(fs.readFileSync(overridesPath, 'utf8'))
      const writeOverrides = (data) => fs.writeFileSync(overridesPath, `${JSON.stringify(data, null, 2)}\n`)
      const projectsPath = path.resolve('src/data/projects.js')

      const removeProjectData = (id, video) => {
        const source = fs.readFileSync(projectsPath, 'utf8')
        const start = source.indexOf('export const projects = [')
        const end = source.indexOf('\n]\n\nexport const processSteps', start)
        const list = source.slice(start, end)
        const escapedId = String(id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const isNumericId = Number.isInteger(id) || /^\d+$/.test(String(id))
        const entryPattern = isNumericId
          ? new RegExp(`\\r?\\n  \\{\\r?\\n    id: ${escapedId},[\\s\\S]*?\\r?\\n  \\},?`)
          : new RegExp(`\\r?\\n  \\{\\"id\\":\\"${escapedId}\\"[^\\r\\n]*\\},?`)
        const nextList = list.replace(entryPattern, '')
        if (nextList === list) return false
        fs.writeFileSync(projectsPath, `${source.slice(0, start)}${nextList}${source.slice(end)}`)
        if (typeof video === 'string' && video.startsWith('/videos/')) {
          const videoPath = path.resolve('public', video.slice(1))
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath)
        }
        return true
      }

      server.middlewares.use((request, response, next) => {
        if (request.url === '/api/local-project-actions' && request.method === 'POST') {
          let body = ''
          request.on('data', (chunk) => { body += chunk })
          request.on('end', () => {
            try {
              const { action, project, id, featured } = JSON.parse(body)
              const data = readOverrides()
              if (action === 'save' && project) {
                data.overrides[String(project.id)] = project
                data.deletedIds = data.deletedIds.filter((deletedId) => String(deletedId) !== String(project.id))
              }
              if (action === 'delete' && id) {
                removeProjectData(id, project?.video)
                delete data.overrides[String(id)]
                data.deletedIds = data.deletedIds.filter((deletedId) => String(deletedId) !== String(id))
                if (String(data.featuredId) === String(id)) data.featuredId = null
              }
              if (action === 'feature') data.featuredId = featured ? String(id) : null
              writeOverrides(data)
              sendJson(response, 200, { ok: true })
            } catch (error) {
              sendJson(response, 400, { error: error.message })
            }
          })
          return
        }

        if (request.url !== '/api/local-projects' || request.method !== 'POST') {
          if (request.url === '/api/local-projects') return sendJson(response, 405, { error: 'Method not allowed.' })
          return next()
        }

        upload.single('video')(request, response, (uploadError) => {
          if (uploadError) return sendJson(response, 400, { error: uploadError.message })

        if (request.method !== 'POST') return sendJson(response, 405, { error: 'Method not allowed.' })
        if (!request.file) return sendJson(response, 400, { error: 'A video file is required.' })

        const categories = JSON.parse(request.body.categories || '[]')
        if (!request.body.title || !categories.length) return sendJson(response, 400, { error: 'Title and category are required.' })

        const project = {
          id: `local-${Date.now()}`,
          title: request.body.title,
          category: categories[0],
          categories,
          thumbnail: '',
          video: `/videos/${request.file.filename}`,
          description: request.body.description || 'Uploaded portfolio edit.',
          client: request.body.client || 'SK_CUTS8',
          style: request.body.style || 'Gaming video edit',
          tools: (request.body.tools || '').split(',').map((tool) => tool.trim()).filter(Boolean),
        }

        const projectData = readOverrides()
        if (request.body.featured === 'true') projectData.featuredId = project.id
        writeOverrides(projectData)

        const projectsPath = path.resolve('src/data/projects.js')
        const source = fs.readFileSync(projectsPath, 'utf8')
        const marker = /\r?\n]\r?\n\r?\nexport const processSteps/
        if (!marker.test(source)) return sendJson(response, 500, { error: 'Could not update project data.' })
        fs.writeFileSync(projectsPath, source.replace(marker, `,\n  ${JSON.stringify(project)}\n]\n\nexport const processSteps`))
        return sendJson(response, 200, { project })
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localUploadPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
