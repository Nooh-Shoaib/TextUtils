import Head from "next/head";

export default function SEO({
  title = "Text Utils Pro - Free Online Text Tools",
  description = "Free online text tools for formatting, analyzing, cleaning, and transforming text. No ads, no tracking, and completely free to use.",
  keywords = "text tools, text formatter, text analyzer, text cleaner, text transformer, online tools",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0066ff" />
      <link rel="canonical" href="https://text-utils-eta-gold.vercel.app" />
    </Head>
  );
}
