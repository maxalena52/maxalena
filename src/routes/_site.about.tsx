import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Maxalena" },
      {
        name: "description",
        content:
          "Maxalena is a writer of sensual, provocative fiction for curious minds and restless hearts.",
      },
    ],
  }),
  component: AboutPage,
});

const THEMES = [
  "Intense chemistry & slow-burning tension",
  "Power, control & delicious surrender",
  "Forbidden and off-limits desires",
  "Complex, magnetic characters",
  "Fantasy, escapism & what-if scenarios that indulge the imagination",
];

const RULES = [
  "Come with an open mind.",
  "Be comfortable with adult themes.",
  "Respect the fictional nature of the work.",
  "Embrace curiosity, fantasy, and a little mischief.",
  "And above all — read, indulge, and enjoy.",
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-3 py-6 md:px-5 md:py-8">
      <section className="about-sheet">
        <div className="about-hero">
          <img src="/about/portrait.png" alt="Portrait of Maxalena" className="about-portrait" />
          <div className="about-copy">
            <h1>About Maxalena</h1>
            <img src="/about/divider.png" alt="" className="about-divider" />
            <p>
              Maxalena is a writer of sensual, provocative fiction for curious minds and restless hearts.{" "}
              <em className="em-pink">Mysterious</em> by nature, <em className="em-pink">seductive</em> in style, and
              always a little ahead of you, she explores desire, power, and the delicious complications between them —
              with a sharp <em className="em-gold">wit</em> and a disarming <em className="em-gold">honesty</em> about
              what she writes and why. Her stories are indulgent, intense, and unapologetically adult, crafted for
              readers who enjoy passion with depth, tension with purpose, and fantasy that dares to be bolder.
            </p>
          </div>
        </div>

        <img
          src="/about/quote.png"
          alt="I write what you pretend not to read."
          className="about-quote"
        />

        <div className="about-grid">
          <article>
            <img src="/about/icon-mask.png" alt="" />
            <h2>The Persona</h2>
            <img src="/about/card-rule.png" alt="" className="about-rule" />
            <p>
              Part storyteller, part temptress, and wholly herself, Maxalena is a private yet playful presence —
              enigmatic, flirtatious, and refreshingly candid about her obsession with desire, imagination, and the
              stories they inspire.
            </p>
          </article>
          <article>
            <img src="/about/icon-book.png" alt="" />
            <h2>What She Writes</h2>
            <img src="/about/card-rule.png" alt="" className="about-rule" />
            <p>
              Sensual and provocative fiction for adult readers — romantic, erotic, and often delightfully forbidden.
              Her work blends emotion, heat, and compelling storytelling, where chemistry burns, boundaries blur, and
              fantasy feels just a little too real.
            </p>
          </article>
          <article>
            <img src="/about/icon-hearts.png" alt="" />
            <h2>Favourite Themes</h2>
            <img src="/about/card-rule.png" alt="" className="about-rule" />
            <ul className="about-hearts">
              {THEMES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <img src="/about/icon-quill.png" alt="" />
            <h2>A Few Rules of Engagement</h2>
            <img src="/about/card-rule.png" alt="" className="about-rule" />
            <ul className="about-checks">
              {RULES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <img src="/about/flourish.png" alt="" className="about-flourish" />
      </section>
    </div>
  );
}
