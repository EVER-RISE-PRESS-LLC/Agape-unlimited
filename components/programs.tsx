"use client";
import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Users,
  Apple,
  House,
  BriefcaseBusiness,
  Accessibility,
  Flag,
  Handshake,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
const programs = [
  {
    name: "Education & academic support",
    icon: BookOpen,
    group: "Children & youth",
    text: "Creating room to learn, grow, and discover what comes next through access to educational resources and academic support.",
  },
  {
    name: "Scholarships & career opportunities",
    icon: GraduationCap,
    group: "Children & youth",
    text: "Opening pathways to continued education and career exploration so that financial barriers do not define a young person’s future.",
  },
  {
    name: "Family assistance & support",
    icon: HeartHandshake,
    group: "Families & everyday needs",
    text: "Connecting families with supportive resources and meaningful relationships that help them move toward greater stability.",
  },
  {
    name: "Youth mentorship",
    icon: Users,
    group: "Children & youth",
    text: "Building caring connections that help young people feel seen, discover their strengths, and imagine new possibilities.",
  },
  {
    name: "Food & basic needs assistance",
    icon: Apple,
    group: "Families & everyday needs",
    text: "Helping connect children and families with food and essential resources, with dignity and respect at every step.",
  },
  {
    name: "Housing & community resources",
    icon: House,
    group: "Families & everyday needs",
    text: "Connecting families with housing information and community resources that may help address barriers to a stable home.",
  },
  {
    name: "Workforce & life-skills development",
    icon: BriefcaseBusiness,
    group: "Community & opportunity",
    text: "Supporting practical skills, confidence, and preparation for work and everyday life.",
  },
  {
    name: "Accessibility & inclusion",
    icon: Accessibility,
    group: "Community & opportunity",
    text: "Working toward opportunities and supportive spaces where people of different abilities can participate and belong.",
  },
  {
    name: "Youth leadership & empowerment",
    icon: Flag,
    group: "Children & youth",
    text: "Encouraging young people to use their voices, build confidence, and take an active role in their communities.",
  },
  {
    name: "Community partnerships & outreach",
    icon: Handshake,
    group: "Community & opportunity",
    text: "Bringing people and organizations together to share resources, build relationships, and strengthen community support.",
  },
];
const groups = [
  "All areas",
  "Children & youth",
  "Families & everyday needs",
  "Community & opportunity",
];
export function Programs() {
  const [group, setGroup] = useState("All areas");
  const visible = programs.filter(
    (p) => group === "All areas" || p.group === group,
  );
  return (
    <div className="program-explorer">
      <div
        className="program-filters"
        role="group"
        aria-label="Filter program areas"
      >
        {groups.map((item) => (
          <button
            key={item}
            aria-pressed={item === group}
            onClick={() => setGroup(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} program areas
      </p>
      <div className="program-list">
        {visible.map(({ name, icon: Icon, text }) => (
          <details className="program" key={name}>
            <summary>
              <span className="program-icon">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3>{name}</h3>
              <Plus className="expand-icon" size={20} aria-hidden="true" />
              <Minus className="collapse-icon" size={20} aria-hidden="true" />
            </summary>
            <div className="program-description">
              <p>{text}</p>
              <a href="#involved">Explore ways to get involved</a>
            </div>
          </details>
        ))}
      </div>
      <p className="program-note">
        These are areas our programs and initiatives may include. Availability
        will depend on resources and community partnerships.
      </p>
    </div>
  );
}
