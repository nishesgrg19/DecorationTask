import React, { useLayoutEffect } from 'react';
import ServiceTemplate from './ServiceTemplate';

const Mehendi = () => {
  useLayoutEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const serviceData = {
    title: "Mehendi & Haldi Ceremonies",
    description: "Traditional yet modern decor for your pre-wedding rituals, blending cultural authenticity with contemporary aesthetics.",
    images: [
      "/assets/mehendi-1.jpg",
      "/assets/mehendi-2.jpg",
      "/assets/mehendi-3.jpg"
    ],
    features: [
      { title: "Traditional Setup", description: "Authentic ethnic decor elements" },
      { title: "Floral Mandap", description: "Fresh flower installations" },
      { title: "Cultural Fusion", description: "Mix of regional traditions" }
    ],
    pricing: [
      {
        title: "Basic Package",
        price: "$0",
        features: ["Basic mandap", "Seating decor", "4-hour duration"]
      },
      {
        title: "Grand Package",
        price: "$0",
        features: ["Premium floral decor", "Thematic photo zones", "Full-day service"]
      }
    ],
    testimonials: [
      {
        text: "Transformed our courtyard into a Rajasthani village theme!",
        name: "Anika Sharma",
        event: "Mehendi Ceremony"
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default Mehendi;