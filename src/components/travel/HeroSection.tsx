import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Globe, Plane, Map, ArrowRight } from 'lucide-react';
import travelGlobe from '@/assets/travel-globe.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center travel-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 animate-pulse">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce">
          <Plane className="w-6 h-6 text-white" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse">
          <Map className="w-10 h-10 text-white" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-bounce">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Travel Planning
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Dream Trip
              <br />
              <span className="relative">
                Planned in 
                <span className="inline-block ml-3 px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
                  Seconds ⚡
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tell us your destination, dates, and preferences. Our AI creates a personalized, 
              day-by-day itinerary with local gems, must-see attractions, and hidden treasures.
            </p>
          </div>

          {/* Travel Globe Image */}
          <div className="relative mx-auto w-80 h-60 md:w-96 md:h-72 my-12">
            <img 
              src={travelGlobe} 
              alt="Travel Globe" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/30 border-2 border-white/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-2xl"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="glass-card p-6 text-white">
              <Globe className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2">Smart Destinations</h3>
              <p className="text-sm text-white/80">AI analyzes millions of reviews to find perfect spots for your style</p>
            </div>
            
            <div className="glass-card p-6 text-white">
              <Map className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2">Day-by-Day Plans</h3>
              <p className="text-sm text-white/80">Detailed itineraries with timing, costs, and local insider tips</p>
            </div>
            
            <div className="glass-card p-6 text-white">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2">Instant & Free</h3>
              <p className="text-sm text-white/80">Get your complete travel plan in seconds, completely free</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90 text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Start Planning Your Trip
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-white/70 text-sm">
              ✨ No signup required • Completely free • Instant results
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
              <div className="text-white/70 text-sm">Trips Planned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">195</div>
              <div className="text-white/70 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">4.9★</div>
              <div className="text-white/70 text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;