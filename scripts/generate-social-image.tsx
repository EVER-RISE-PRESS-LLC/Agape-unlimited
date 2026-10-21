/* eslint-disable @next/next/no-img-element -- Satori renders this build-time image, not browser HTML. */
import React from 'react';
import { ImageResponse } from "next/og";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";
import { social } from "@/lib/social";

export const alt = social.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function OpenGraphImage() {
  const [stylesheet, logo, displayFont, bodyFont] = await Promise.all([
    readFile(join(process.cwd(), "app/globals.css"), "utf8"),
    readFile(join(process.cwd(), "public/images/agape-seal.png"), "base64"),
    readFile(join(process.cwd(), "assets/fonts/Montserrat-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/SourceSans3-SemiBold.ttf")),
  ]);

  // Read the website's tokens so palette changes reach the card on the next build.
  function color(token: string) {
    const value = stylesheet.match(
      new RegExp(`--${token}:\\s*(#[a-f\\d]{6})\\s*;`, "i"),
    )?.[1];
    if (!value) throw new Error(`Missing social image color token: --${token}`);
    return value;
  }

  const navy = color("navy");
  const ivory = color("ivory");
  const gold = color("gold");
  const muted = color("muted");


  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: ivory,
          color: navy,
          fontFamily: "Source Sans 3",
          padding: "54px 60px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 700,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{ width: 8, height: 8, borderRadius: "50%", background: gold }}
            />
            <div style={{ fontSize: 26 }}>{site.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 76,
              letterSpacing: "-4px",
              lineHeight: 1.12,
              marginTop: 64,
            }}
          >
            {social.headline.map((line) => (
              <div key={line} style={{ display: "flex" }}>{line}</div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              width: 600,
              fontSize: 25,
              lineHeight: 1.5,
              color: muted,
              marginTop: 36,
            }}
          >
            {social.description}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: 54,
            right: 50,
            width: 342,
            height: 484,
            border: `1px solid ${gold}`,
            borderRadius: "180px 180px 16px 16px",
          }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: 68,
            right: 64,
            width: 342,
            height: 484,
            borderRadius: "180px 180px 16px 16px",
            background: "white",
          }}
        >
          {/* This is the image renderer, not a browser image element. */}
          <img
            src={`data:image/png;base64,${logo}`}
            width={258}
            height={237}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 20,
              color: muted,
            }}
          >
            Love without limits
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: gold,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: displayFont, weight: 600, style: "normal" },
        { name: "Source Sans 3", data: bodyFont, weight: 600, style: "normal" },
      ],
    },
  );
}

const image = await OpenGraphImage();
await writeFile(join(process.cwd(), "public/opengraph-image"), Buffer.from(await image.arrayBuffer()));
console.log("Generated the branded social image.");
