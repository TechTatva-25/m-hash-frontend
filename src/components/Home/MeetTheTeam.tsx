import React from "react";
import styles from "../../styles/meet-the-cc.module.css";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const ccMembers = [
  {
    name: "Tanishq Kochar",
    image: "/images/Tanishq.jpeg",
    bio: "I write code that works... eventually. Full-time backend dev, part-time debugger, and professional coffee-dependent organism.",
    instagram: "https://instagram.com/tanishqkochar/",
    linkedin: "https://linkedin.com/in/tanishq-kochar",
  },
  {
    name: "Lakshya Jain",
    image: "/images/lakshya.jpeg",
    bio: "Mostly found wrestling with APIs and pretending bugs are features. Backend is my playground — just don’t ask me about CSS.",
    instagram: "https://www.instagram.com/lakshyajain428/",
    linkedin: "https://www.linkedin.com/in/lakshya-jain-490ab9211/",
  },
  {
    name: "Prasanna Bhat",
    image: "/images/prasanna.jpg",
    bio: "Turning pixels into pages and rage into React. If it looks good, I made it. If it breaks on IE... it’s a feature.",
    instagram: "https://instagram.com/prasanna.bhatt_",
    linkedin: "https://www.linkedin.com/in/prasanna-bhat-b259ba285/",
  },
  {
    name: "Shubham Panda",
    image: "/images/shubham.jpg",
    bio: "I bring Figma to life and sometimes to tears. Animations? Done. Responsiveness? Always. Sanity? Eh, debatable.",
    instagram: "https://www.instagram.com/suvm._/",
    linkedin: "https://www.linkedin.com/in/shubham-panda-699538258/",
  },
  {
    name: "Ahmad",
    image: "/images/ahmad.jpeg",
    bio: "Always down for some clean architecture and chaotic deadlines. I break things so I can fix them better — poetic, I know.",
    instagram: "https://instagram.com/ahmad",
    linkedin: "https://linkedin.com/in/ahmad",
  },
  {
    name: "Pulkit Kumar",
    image: "/images/ahmad.jpeg",
    bio: "Carol ensures the team stays on track and delivers on time.",
    instagram: "https://instagram.com/pulkit",
    linkedin: "https://linkedin.com/in/pulkit",
  },
];

const MeetTheTeam: React.FC = () => (
  <section className={styles.meetTheCCSection}>
    <h2 className={styles.heading}>Meet the Team</h2>
    <div className={styles.membersGrid}>
      {ccMembers.map((member) => (
        <div className={styles.memberCard} key={member.name}>
          <div className={styles.avatarWrapper}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.memberImage}
            />
          </div>
          <h3 className={styles.memberName}>{member.name}</h3>
          <p className={styles.memberBio}>{member.bio}</p>
          <div className={styles.socials}>
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default MeetTheTeam;