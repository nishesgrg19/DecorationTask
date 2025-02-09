import React, { useLayoutEffect } from 'react';
import ServiceTemplate from './ServiceTemplate';

const School = () => {
  useLayoutEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const serviceData = {
    title: "School & College Events",
    description: "Dynamic decor solutions for academic events, competitions, and cultural festivals.",
    images: [
      "/assets/school-1.jpg",
      "/assets/school-2.jpg",
      "/assets/school-3.jpg"
    ],
    features: [
      { title: "Theme Customization", description: "Alumni meets to annual days" },
      { title: "Stage Design", description: "Professional backdrop setups" },
      { title: "Interactive Zones", description: "Photo booths, game corners" }
    ],
    pricing: [
      {
        title: "Standard Package",
        price: "0",
        features: ["Basic stage decor", "2 installations", "6-hour service"]
      },
      {
        title: "Premium Package",
        price: "0",
        features: ["Full venue makeover", "Interactive zones", "Multi-day support"]
      }
    ],
    testimonials: [
      {
        text: "Our college fest looked professional thanks to their team!",
        name: "College Committee",
        event: "Annual Cultural Fest"
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default School;