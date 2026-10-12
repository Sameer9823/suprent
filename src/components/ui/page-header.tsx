import { Container } from "./container";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function PageHeader({ title, description, crumbs }: { title: string; description?: string; crumbs: Crumb[] }) {
  return (
    <header className="border-b border-line bg-white">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-body">{description}</p>}
      </Container>
    </header>
  );
}
