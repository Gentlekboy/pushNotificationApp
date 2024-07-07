export type SendPushResponse = {
  code: string | null;
  description: string | null;
  messages: string[] | null;
};

export type SendPushRequest = {
  poiId: string;
  userOrDeviceId: string;
};

export type AppGeofence = {
  endDate: string;
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  startDate: string;
  name: string;
};

export type GetPointOfInterest = {
  data: AppGeofence[] | null;
  message: string | null;
};
