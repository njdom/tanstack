import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nueva/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nueva/"!</div>
}
