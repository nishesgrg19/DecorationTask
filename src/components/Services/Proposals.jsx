import React, { useLayoutEffect } from 'react';
import ServiceTemplate from './ServiceTemplate';

const Proposals = () => {
  useLayoutEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const serviceData = {
    title: "Surprise Proposals",
    description: "Create unforgettable marriage proposals with our romantic setups and hidden camera arrangements.",
    images: [
      "/assets/proposal-1.jpg",
      "/assets/proposal-2.jpg",
      "/assets/proposal-3.jpg"
    ],
    features: [
      { title: "Theme Options", description: "Beach, garden, rooftop themes" },
      { title: "Hidden Photography", description: "Discreet capture of moments" },
      { title: "Instant Celebration", description: "Champagne & cake service" }
    ],
    pricing: [
      {
        title: "Intimate Setup",
        price: "$0",
        features: ["Basic decoration", "1-hour duration", "Photo capture"]
      },
      {
        title: "Luxury Package",
        price: "$0",
        features: ["Premium location", "Videography", "Celebration package"]
      }
    ],
    testimonials: [
      {
        text: "Made my proposal look straight out of a movie!",
        name: "Raj Patel",
        event: "Beach Proposal"
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default Proposals;