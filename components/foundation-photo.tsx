import Image from "next/image";

type PhotoName = "founder-home" | "founder-community";

export function FoundationPhoto({ name, alt, sizes, eager = false }: {
  name: PhotoName;
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  const widths = [480, 768, name === "founder-home" ? 1072 : 1536];
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={widths.map((width) => `/images/${name}-${width}.webp ${width}w`).join(", ")}
        sizes={sizes}
      />
      <Image
        src={`/images/${name}.jpeg`}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
    </picture>
  );
}
