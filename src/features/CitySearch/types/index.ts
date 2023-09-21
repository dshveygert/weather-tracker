export type LocalName = {
    [key: string]: string;
};

export type City = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: LocalName;
};
