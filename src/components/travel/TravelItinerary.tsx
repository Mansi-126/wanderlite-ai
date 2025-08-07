import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Utensils, 
  Camera, 
  Star, 
  Download, 
  Share2,
  CalendarDays,
  DollarSign,
  Info,
  Navigation
} from 'lucide-react';

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
  meals: Meal[];
  tips: string[];
}

interface Activity {
  time: string;
  name: string;
  type: 'attraction' | 'activity' | 'transport' | 'accommodation';
  description: string;
  duration: string;
  cost?: string;
  rating?: number;
  location: string;
}

interface Meal {
  time: string;
  restaurant: string;
  cuisine: string;
  price_range: string;
  description: string;
  location: string;
}

interface TravelItineraryProps {
  itinerary: ItineraryDay[];
  destination: string;
  totalDays: number;
  budget: string;
  onExportPDF?: () => void;
  onShare?: () => void;
  onModify?: () => void;
}

const TravelItinerary: React.FC<TravelItineraryProps> = ({
  itinerary,
  destination,
  totalDays,
  budget,
  onExportPDF,
  onShare,
  onModify
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attraction': return <Camera className="w-5 h-5" />;
      case 'activity': return <Star className="w-5 h-5" />;
      case 'transport': return <Navigation className="w-5 h-5" />;
      case 'accommodation': return <MapPin className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attraction': return 'text-primary';
      case 'activity': return 'text-secondary';
      case 'transport': return 'text-accent';
      case 'accommodation': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-card border-primary/20 shadow-rainbow">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl rainbow-text mb-2">
                Your {destination} Adventure ✨
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gradient-primary text-primary-foreground">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {totalDays} Days
                </Badge>
                <Badge className="bg-gradient-secondary text-secondary-foreground">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {budget}
                </Badge>
                <Badge className="bg-gradient-rainbow text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Personalized
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onShare}
                className="glass-card border-primary/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                onClick={onExportPDF}
                className="glass-card border-secondary/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                onClick={onModify}
                className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground shadow-glow"
              >
                Modify Plan
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Itinerary Days */}
      <div className="space-y-6">
        {itinerary.map((day) => (
          <Card key={day.day} className="glass-card border-primary/10 hover:border-primary/30 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-glow">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gradient">{day.title}</h3>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Activities */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Daily Activities
                </h4>
                <div className="space-y-3">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex flex-col items-center">
                        <div className={`${getTypeColor(activity.type)} mb-1`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold">{activity.name}</h5>
                          <div className="flex items-center gap-2">
                            {activity.cost && (
                              <Badge variant="outline" className="text-xs">
                                {activity.cost}
                              </Badge>
                            )}
                            {activity.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current text-accent" />
                                <span className="text-xs">{activity.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {activity.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.duration}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              {day.meals && day.meals.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-secondary" />
                    Recommended Dining
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {day.meals.map((meal, index) => (
                      <div key={index} className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-sm">{meal.restaurant}</h5>
                          <Badge variant="outline" className="text-xs">
                            {meal.time}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{meal.cuisine}</span>
                            <span className="font-medium">{meal.price_range}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{meal.description}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {meal.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Local Tips */}
              {day.tips && day.tips.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-accent" />
                    Local Tips
                  </h4>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <ul className="space-y-2">
                      {day.tips.map((tip, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-accent font-bold">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Actions */}
      <Card className="glass-card border-success/20">
        <CardContent className="py-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold rainbow-text">
              Ready for Your Adventure? 🎉
            </h3>
            <p className="text-muted-foreground">
              Your personalized itinerary is ready! Don't forget to check local weather and current attractions before you go.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={onExportPDF}
                className="glass-card border-primary/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Save as PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={onShare}
                className="glass-card border-secondary/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share with Friends
              </Button>
              <Button 
                onClick={onModify}
                className="bg-gradient-rainbow text-white shadow-glow"
              >
                Plan Another Trip ✨
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelItinerary;