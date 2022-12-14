export interface ListResponse {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url?: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}

export interface FilterFormInterface {
  description: string;
  location: string;
  full_time: boolean[];
}
