import React, { useState } from 'react';
import HeroSection from '@/components/travel/HeroSection';
import TravelPlannerForm from '@/components/travel/TravelPlannerForm';
import TravelItinerary from '@/components/travel/TravelItinerary';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockItinerary = [
  {
    day: 1,
    date: "2025-08-08",
    title: "Arrival & City Exploration",
    activities: [
      {
        time: "09:00",
        name: "Arrival at Destination",
        type: "transport" as const,
        description: "Arrive at the airport and transfer to hotel",
        duration: "2 hours",
        location: "Airport - City Center"
      },
      {
        time: "12:00",
        name: "Historic City Center Tour",
        type: "attraction" as const,
        description: "Explore the beautiful historic district with its stunning architecture",
        duration: "3 hours",
        cost: "$25",
        rating: 4.8,
        location: "Old Town Square"
      },
      {
        time: "16:00",
        name: "Local Art Gallery",
        type: "activity" as const,
        description: "Visit contemporary art exhibitions showcasing local artists",
        duration: "2 hours",
        cost: "$15",
        rating: 4.5,
        location: "Arts District"
      }
    ],
    meals: [
      {
        time: "Lunch",
        restaurant: "Casa Local",
        cuisine: "Traditional",
        price_range: "$$",
        description: "Authentic local dishes with fresh ingredients",
        location: "Historic Center"
      },
      {
        time: "Dinner",
        restaurant: "Rooftop Bistro",
        cuisine: "International",
        price_range: "$$$",
        description: "Fine dining with city skyline views",
        location: "Downtown"
      }
    ],
    tips: [
      "Download the local transport app for easy navigation",
      "Many museums offer free entry on the first Sunday of the month",
      "Try the local specialty dish - it's a must-have experience!"
    ]
  },
  {
    day: 2,
    date: "2025-08-09",
    title: "Nature & Adventure",
    activities: [
      {
        time: "08:00",
        name: "Mountain Hiking Trail",
        type: "activity" as const,
        description: "Scenic hiking trail with breathtaking views of the valley",
        duration: "4 hours",
        cost: "Free",
        rating: 4.9,
        location: "National Park"
      },
      {
        time: "14:00",
        name: "Local Wildlife Sanctuary",
        type: "attraction" as const,
        description: "Educational visit to see native wildlife and conservation efforts",
        duration: "2.5 hours",
        cost: "$20",
        rating: 4.7,
        location: "Wildlife Reserve"
      }
    ],
    meals: [
      {
        time: "Breakfast",
        restaurant: "Mountain Café",
        cuisine: "Continental",
        price_range: "$",
        description: "Hearty breakfast before the hike",
        location: "Trailhead"
      },
      {
        time: "Lunch",
        restaurant: "Park Restaurant",
        cuisine: "Healthy",
        price_range: "$$",
        description: "Fresh salads and energy bowls",
        location: "National Park"
      }
    ],
    tips: [
      "Bring comfortable hiking shoes and water bottle",
      "Weather can change quickly in the mountains - pack layers",
      "Best photo opportunities are in the early morning light"
    ]
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'form' | 'itinerary'>('hero');
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState(mockItinerary);
  const [formData, setFormData] = useState<any>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    setFormData(data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Itinerary Created! ✨",
      description: `Your personalized ${data.num_days}-day trip to ${data.country} is ready!`,
    });
    
    setIsLoading(false);
    setCurrentView('itinerary');
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "Your itinerary PDF is being prepared for download!",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Itinerary",
      description: "Share link copied to clipboard!",
    });
  };

  const handleModifyPlan = () => {
    setCurrentView('form');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'form' && (
        <div className="min-h-screen py-8 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <button 
                onClick={handleBackToHero}
                className="text-primary hover:text-primary/80 mb-4 inline-flex items-center gap-2"
              >
                ← Back to Home
              </button>
              <h1 className="text-4xl font-bold rainbow-text mb-4">
                Let's Plan Your Dream Trip ✨
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us about your travel preferences and we'll create a personalized itinerary just for you
              </p>
            </div>
            
            <TravelPlannerForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
      
      {currentView === 'itinerary' && formData && (
        <div className="min-h-screen py-8 px-4">
          <div className="container mx-auto">
            <TravelItinerary
              itinerary={itineraryData}
              destination={formData.country}
              totalDays={formData.num_days}
              budget={formData.budget}
              onExportPDF={handleExportPDF}
              onShare={handleShare}
              onModify={handleModifyPlan}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
