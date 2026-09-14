import { createFileRoute, Link } from "@tanstack/react-router";
import { PreviewReader } from "@/components/preview-reader";
import { getBookPreview } from "@/lib/preview";

export const Route = createFileRoute("/_site/books/$slug/preview")({
  loader: ({ params }) => getBookPreview({ data: { slug: params.slug } }),
  head: ({ params }) => ({
    meta: [
      { title: `Sample · ${params.slug} | Maxalena L.` },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const preview = Route.useLoaderData();

  if (!preview.found) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="ornament mb-4">404</p>
        <h1 className="font-display text-4xl">This volume is not in the library</h1>
        <Link to="/books" className="btn mt-8">
          Explore the Books
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 pt-6">
        <Link to="/books/$slug" params={{ slug: preview.slug }} className="font-ui text-xs uppercase tracking-widest text-taupe">
          Close sample
        </Link>
        <span className="font-ui text-xs uppercase tracking-widest text-gold">Reader</span>
      </div>
      <PreviewReader preview={preview} />
    </div>
  );
}
