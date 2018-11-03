import { MovieResult } from './searchMovie';
import { TVResult } from './SearchTV';

export interface SearchPeopleQuery {
  language?: string; // Pass a ISO 639-1 value to display translated data for the fields that support it.
  // default: en-US
  query: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
}

export interface SearchPeopleResponse {
  page?: number;
  results?: {
    profile_path?: string;
    adult?: boolean;
    id?: number;
    known_for?: MovieResult | (TVResult & { media_type: string; /* Allowed Values: tv */ });
  }[];
  name?: string;
  popularity?: number;
  total_results?: number;
  total_pages?: number;
}

export interface KnownFor {
  vote_average: number;
  vote_count: number;
  id: number;
  video: boolean;
  media_type: string;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  original_name: string;
  name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface PersonResult {
  popularity: number;
  id: number;
  profile_path: string;
  name: string;
  known_for: KnownFor[];
  adult: boolean;
}

export interface PersonlistResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: PersonResult[];
}
