import { Hono } from 'hono'
import { renderer } from './renderer'
import { HomePage } from './pages/home'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<HomePage />, { title: 'دِوکَست | آکادمی برنامه‌نویسی پروژه‌محور' })
})

export default app
