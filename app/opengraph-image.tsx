import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Christopher Egbaaibon — Full-Stack Engineer & Software Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B0B0C",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,169,173,0.08) 0%, transparent 70%)",
            transform: "translateY(-50%)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            width: "120px",
            height: "3px",
            borderRadius: "2px",
            background:
              "linear-gradient(90deg, #C0C0C0, #F5F5F5, #A8A9AD)",
          }}
        />

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginTop: "40px",
          }}
        >
          <span
            style={{
              fontSize: "68px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Christopher
          </span>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg, #C0C0C0, #F5F5F5, #A8A9AD, #F5F5F5, #C0C0C0)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Egbaaibon
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "200px",
            height: "1px",
            marginTop: "24px",
            background:
              "linear-gradient(90deg, rgba(192,192,192,0.4), transparent)",
          }}
        />

        {/* Role */}
        <span
          style={{
            fontSize: "24px",
            color: "#A3A3A3",
            marginTop: "20px",
            letterSpacing: "0.5px",
          }}
        >
          Full-Stack Engineer & Software Architect
        </span>

        {/* Description */}
        <span
          style={{
            fontSize: "17px",
            color: "#737373",
            marginTop: "12px",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          Building scalable systems, high-performance APIs & production-ready
          platforms.
        </span>

        {/* URL */}
        <span
          style={{
            position: "absolute",
            bottom: "50px",
            left: "80px",
            fontSize: "15px",
            color: "#525252",
            letterSpacing: "1.5px",
            fontFamily: "monospace",
          }}
        >
          chrisdev-two.vercel.app
        </span>

        {/* Border */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            border: "1px solid rgba(192,192,192,0.08)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
