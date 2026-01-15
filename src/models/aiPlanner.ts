export interface UserPlannerFormValue {
  startDate: string;
  endDate: string;
  companions: string;
  peopleCount: number;
  mood: string;
}

export interface AiPlannerResult {
  itinerary: ItineraryDay[];
  preparations: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Activity {
  time: string;
  location: string;
  description: string;
}
