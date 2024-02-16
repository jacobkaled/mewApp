export type Favorite = {
  created_at: string;
  id: number;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string | null;
  user_id: string;
};

// this
// export const API_KEY =
//   "live_puw6ufBzDBnh6Wyde05s6J81oK1NS9lWzyignHoXN5yUhwYJeKPjLbCYF2zNMgIq";

export type QueryParams = {
  limit?: string;
  page?: string;
  breed_ids?: string;
  category_ids?: string;
  has_breeds?: string;
  sub_id?: string;
  [key: string]: string | number | undefined;
};

export type Breed = {
  weight?: { imperial: string; metric: string };
  adaptability?: number;
  affection_level?: number;
  alt_names?: string;
  cfa_url?: string;
  child_friendly?: string;
  country_code: string;
  country_codes: string;
  description?: string;
  dog_friendly?: number;
  energy_level?: number;
  experimental?: number;
  grooming?: number;
  hairless?: number;
  health_issues?: number;
  hypoallergenic?: number;
  id: string;
  indoor?: number;
  intelligence?: number;
  lap?: number;
  life_span: string;
  name: string;
  natural?: number;
  origin: string;
  rare?: number;
  reference_image_id?: string;
  rex?: number;
  shedding_level?: number;
  short_legs?: number;
  social_needs?: number;
  stranger_friendly?: number;
  suppressed_tail?: number;
  temperament: string;
  vcahospitals_url?: string;
  vetstreet_url?: string;
  vocalisation?: number;
};

export type Breeds = Array<Breed>;

export type CatData = {
  height: number;
  id: string;
  url: string;
  width: number;
  favourite?: boolean;
  breeds: Breeds | [];
};

export type CatsResp = Array<CatData>;
export type FavoritesRes = Array<Favorite>;
