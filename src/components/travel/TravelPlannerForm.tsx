import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, DollarSign, Clock, Heart, Camera, Utensils } from 'lucide-react';

interface TravelFormData {
  country: string;
  state: string;
  cities: string[];
  trip_type: string;
  trip_purpose: string;
  preferred_pace: string;
  immersion_level: string;
  num_days: number;
  start_date: string;
  group_type: string;
  budget: string;
  accommodation: string;
  transport_mode: string;
  landscapes: string[];
  activity_interests: string[];
  food_preferences: string[];
  accessibility: string;
  climate_preference: string;
  must_visit_spots: string[];
  special_notes: string;
}

interface TravelPlannerFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading?: boolean;
}

const TravelPlannerForm: React.FC<TravelPlannerFormProps> = ({ onSubmit, isLoading = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TravelFormData>({
    country: '',
    state: '',
    cities: [],
    trip_type: '',
    trip_purpose: '',
    preferred_pace: 'Balanced',
    immersion_level: '',
    num_days: 1,
    start_date: '',
    group_type: '',
    budget: 'Mid-range',
    accommodation: 'Mid-range Hotel',
    transport_mode: 'Combination',
    landscapes: [],
    activity_interests: [],
    food_preferences: [],
    accessibility: 'None',
    climate_preference: 'No Preference',
    must_visit_spots: [],
    special_notes: ''
  });

  const totalSteps = 6;

  const handleInputChange = (field: keyof TravelFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayField = (field: keyof TravelFormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const stepTitles = [
    'Destination',
    'Trip Details',
    'Preferences',
    'Budget & Stay',
    'Interests',
    'Final Details'
  ];

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
        <Badge variant="secondary" className="rainbow-bg border-0">
          {stepTitles[currentStep - 1]}
        </Badge>
      </div>
      <div className="w-full bg-muted rounded-full h-3">
        <div 
          className="bg-gradient-primary h-3 rounded-full transition-all duration-500 shadow-glow"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderDestinationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold rainbow-text">Where do you want to go?</h2>
        <p className="text-muted-foreground mt-2">Let's start your amazing journey by choosing your destination</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            placeholder="Enter country name..."
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="glass-card border-primary/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            placeholder="Enter state or province..."
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="glass-card border-primary/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cities">Cities to Visit</Label>
        <Textarea
          id="cities"
          placeholder="Enter cities separated by commas (e.g., Paris, Lyon, Nice)"
          value={formData.cities.join(', ')}
          onChange={(e) => handleInputChange('cities', e.target.value.split(',').map(city => city.trim()).filter(Boolean))}
          className="glass-card border-primary/20"
          rows={3}
        />
      </div>
    </div>
  );

  const renderTripDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-secondary" />
        <h2 className="text-2xl font-bold text-gradient">Trip Details</h2>
        <p className="text-muted-foreground mt-2">Tell us about your travel plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
            className="glass-card border-secondary/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="num_days">Number of Days</Label>
          <Input
            id="num_days"
            type="number"
            min="1"
            max="365"
            value={formData.num_days}
            onChange={(e) => handleInputChange('num_days', parseInt(e.target.value) || 1)}
            className="glass-card border-secondary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Trip Type</Label>
          <Select onValueChange={(value) => handleInputChange('trip_type', value)}>
            <SelectTrigger className="glass-card border-secondary/20">
              <SelectValue placeholder="Select trip type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leisure">Leisure</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="romantic">Romantic</SelectItem>
              <SelectItem value="family">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Group Type</Label>
          <Select onValueChange={(value) => handleInputChange('group_type', value)}>
            <SelectTrigger className="glass-card border-secondary/20">
              <SelectValue placeholder="Select group type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="friends">Friends</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderPreferencesStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-accent" />
        <h2 className="text-2xl font-bold text-gradient">Your Preferences</h2>
        <p className="text-muted-foreground mt-2">Help us personalize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Preferred Pace</Label>
          <Select value={formData.preferred_pace} onValueChange={(value) => handleInputChange('preferred_pace', value)}>
            <SelectTrigger className="glass-card border-accent/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Relaxed">Relaxed</SelectItem>
              <SelectItem value="Balanced">Balanced</SelectItem>
              <SelectItem value="Fast-paced">Fast-paced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Immersion Level</Label>
          <Select onValueChange={(value) => handleInputChange('immersion_level', value)}>
            <SelectTrigger className="glass-card border-accent/20">
              <SelectValue placeholder="Select immersion level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tourist highlights">Tourist highlights</SelectItem>
              <SelectItem value="Local experiences">Local experiences</SelectItem>
              <SelectItem value="Deep cultural immersion">Deep cultural immersion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Trip Purpose</Label>
        <Select onValueChange={(value) => handleInputChange('trip_purpose', value)}>
          <SelectTrigger className="glass-card border-accent/20">
            <SelectValue placeholder="What's the main purpose of your trip?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Relaxation">Relaxation</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Cultural exploration">Cultural exploration</SelectItem>
            <SelectItem value="Food & cuisine">Food & cuisine</SelectItem>
            <SelectItem value="Photography">Photography</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderBudgetStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <DollarSign className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold rainbow-text">Budget & Accommodation</h2>
        <p className="text-muted-foreground mt-2">Let's plan according to your budget</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Budget Range</Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
            <SelectTrigger className="glass-card border-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Budget">Budget (Under $100/day)</SelectItem>
              <SelectItem value="Mid-range">Mid-range ($100-300/day)</SelectItem>
              <SelectItem value="Luxury">Luxury ($300+/day)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Accommodation Type</Label>
          <Select value={formData.accommodation} onValueChange={(value) => handleInputChange('accommodation', value)}>
            <SelectTrigger className="glass-card border-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hostel">Hostel</SelectItem>
              <SelectItem value="Budget Hotel">Budget Hotel</SelectItem>
              <SelectItem value="Mid-range Hotel">Mid-range Hotel</SelectItem>
              <SelectItem value="Luxury Hotel">Luxury Hotel</SelectItem>
              <SelectItem value="Resort">Resort</SelectItem>
              <SelectItem value="Airbnb">Airbnb</SelectItem>
              <SelectItem value="Boutique">Boutique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Transportation Mode</Label>
        <Select value={formData.transport_mode} onValueChange={(value) => handleInputChange('transport_mode', value)}>
          <SelectTrigger className="glass-card border-primary/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Walking">Walking</SelectItem>
            <SelectItem value="Public transport">Public transport</SelectItem>
            <SelectItem value="Rental car">Rental car</SelectItem>
            <SelectItem value="Taxi/Uber">Taxi/Uber</SelectItem>
            <SelectItem value="Combination">Combination</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderInterestsStep = () => {
    const landscapes = [
      'Mountains', 'Beaches', 'Forests', 'Cities', 'Desert', 'Lakes', 
      'Islands', 'Countryside', 'Rivers', 'Canyons'
    ];

    const activities = [
      'Museums', 'Art galleries', 'Historical sites', 'Nature walks', 'Photography',
      'Shopping', 'Nightlife', 'Festivals', 'Sports', 'Wellness', 'Adventure sports',
      'Food tours', 'Local markets', 'Architecture', 'Music venues'
    ];

    const foods = [
      'Local cuisine', 'Street food', 'Fine dining', 'Vegetarian', 'Vegan',
      'Seafood', 'Desserts', 'Coffee culture', 'Wine tasting', 'Food markets'
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <Camera className="w-16 h-16 mx-auto mb-4 text-secondary" />
          <h2 className="text-2xl font-bold text-gradient">Your Interests</h2>
          <p className="text-muted-foreground mt-2">What excites you most about traveling?</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Preferred Landscapes</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {landscapes.map((landscape) => (
                <div key={landscape} className="flex items-center space-x-2">
                  <Checkbox
                    id={`landscape-${landscape}`}
                    checked={formData.landscapes.includes(landscape)}
                    onCheckedChange={(checked) => handleArrayField('landscapes', landscape, !!checked)}
                  />
                  <Label 
                    htmlFor={`landscape-${landscape}`}
                    className="text-sm cursor-pointer"
                  >
                    {landscape}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Activity Interests</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activities.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`activity-${activity}`}
                    checked={formData.activity_interests.includes(activity)}
                    onCheckedChange={(checked) => handleArrayField('activity_interests', activity, !!checked)}
                  />
                  <Label 
                    htmlFor={`activity-${activity}`}
                    className="text-sm cursor-pointer"
                  >
                    {activity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Food Preferences</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {foods.map((food) => (
                <div key={food} className="flex items-center space-x-2">
                  <Checkbox
                    id={`food-${food}`}
                    checked={formData.food_preferences.includes(food)}
                    onCheckedChange={(checked) => handleArrayField('food_preferences', food, !!checked)}
                  />
                  <Label 
                    htmlFor={`food-${food}`}
                    className="text-sm cursor-pointer"
                  >
                    {food}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinalDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Clock className="w-16 h-16 mx-auto mb-4 text-accent" />
        <h2 className="text-2xl font-bold rainbow-text">Final Details</h2>
        <p className="text-muted-foreground mt-2">Last few questions to perfect your itinerary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Climate Preference</Label>
          <Select value={formData.climate_preference} onValueChange={(value) => handleInputChange('climate_preference', value)}>
            <SelectTrigger className="glass-card border-accent/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No Preference">No Preference</SelectItem>
              <SelectItem value="Warm">Warm</SelectItem>
              <SelectItem value="Cool">Cool</SelectItem>
              <SelectItem value="Tropical">Tropical</SelectItem>
              <SelectItem value="Temperate">Temperate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Accessibility Needs</Label>
          <Select value={formData.accessibility} onValueChange={(value) => handleInputChange('accessibility', value)}>
            <SelectTrigger className="glass-card border-accent/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Wheelchair accessible">Wheelchair accessible</SelectItem>
              <SelectItem value="Mobility assistance">Mobility assistance</SelectItem>
              <SelectItem value="Visual assistance">Visual assistance</SelectItem>
              <SelectItem value="Hearing assistance">Hearing assistance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Must-Visit Spots (Optional)</Label>
        <Textarea
          placeholder="Any specific places you absolutely want to visit? (separated by commas)"
          value={formData.must_visit_spots.join(', ')}
          onChange={(e) => handleInputChange('must_visit_spots', e.target.value.split(',').map(spot => spot.trim()).filter(Boolean))}
          className="glass-card border-accent/20"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Special Notes</Label>
        <Textarea
          placeholder="Any special requirements, dietary restrictions, or additional information..."
          value={formData.special_notes}
          onChange={(e) => handleInputChange('special_notes', e.target.value)}
          className="glass-card border-accent/20"
          rows={4}
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderDestinationStep();
      case 2: return renderTripDetailsStep();
      case 3: return renderPreferencesStep();
      case 4: return renderBudgetStep();
      case 5: return renderInterestsStep();
      case 6: return renderFinalDetailsStep();
      default: return renderDestinationStep();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto glass-card border-primary/20 shadow-rainbow">
      <CardHeader>
        {renderProgressBar()}
      </CardHeader>
      <CardContent>
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="glass-card"
          >
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !formData.country}
              className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground shadow-glow"
            >
              {isLoading ? 'Creating Itinerary...' : 'Create My Itinerary ✨'}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={currentStep === 1 && !formData.country}
              className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground shadow-glow"
            >
              Next Step
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelPlannerForm;