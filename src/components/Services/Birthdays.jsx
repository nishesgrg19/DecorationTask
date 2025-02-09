import { useLayoutEffect } from 'react';
import ServiceTemplate from './ServiceTemplate';

const Birthdays = () => {
  useLayoutEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const serviceData = {
    title: "Birthday Celebrations",
    description: "Make every birthday unforgettable with our themed decorations, custom setups, and magical atmosphere creation.",
    images: [
      "/assets/birthdaybatman.png",
      "/assets/gallery-1.jpg",
      "/assets/image-3.png"
    ],
    features: [
      { title: "Themed Decor", description: "Custom themes from superheroes to princess parties" },
      { title: "Age-specific Designs", description: "Unique designs for kids, teens & adults" },
      { title: "Interactive Elements", description: "Photo booths, candy bars & activity zones" }
    ],
    pricing: [
      {
        title: "Basic Package",
        price: "$0",
        features: ["50 pcs Helium Balloons", "30 pcs Floor Balloons", "Foil Balloons", "Letter Foil set"]
      },
      {
        title: "Standard Package",
        price: "$0",
        features: ["2 pcs Curtain Foils", "Balloon Garland", "Tassels", "Letter Foil Set"]
      },
      {
        title: "Premium Package",
        price: "$0",
        features: ["Customized Arcylic Name", "Cutout Balloon Garland", "cake topper", "Number Foil Set", "4 pcs curtain Foil"]
      }
    ],
    testimonials: [
      {
        text: "Amazing birthday setup for our daughter's 10th birthday!",
        name: "Sarah Johnson",
        event: "10th Birthday Party"
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default Birthdays;