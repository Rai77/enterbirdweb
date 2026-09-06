import type { Article, ArticleBlock } from "@/lib/blogArticles";

/**
 * `**kalın**` işaretlemesini <strong> olarak basar. Yazı gövdelerinde tam bir
 * markdown ayrıştırıcısına ihtiyaç yok; tek gereken vurgu.
 */
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    return m ? (
      <strong key={i} className="font-semibold text-foreground">
        {m[1]}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.1em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface/60 text-xs font-medium text-brand">
                {i + 1}
              </span>
              <span>{inline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="mt-10 border-l-2 border-brand/60 pl-6 text-lg font-medium italic text-foreground/90 sm:text-xl">
          {inline(block.text)}
        </blockquote>
      );
    default:
      return <p className="mt-6">{inline(block.text)}</p>;
  }
}

export function ArticleBody({
  article,
  sourcesLabel,
}: {
  article: Article;
  sourcesLabel: string;
}) {
  return (
    <div className="text-base leading-relaxed text-muted sm:text-lg">
      {article.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}

      {article.sources && article.sources.length > 0 && (
        <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-6">
          <div className="text-xs font-medium uppercase tracking-widest text-muted">
            {sourcesLabel}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 underline decoration-border underline-offset-4 transition hover:text-brand"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
