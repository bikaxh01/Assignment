export interface CreateEventInterface {
  userId: string;
  name: string;
  description?: string;
  date: string;
  time: string;
  imageUrl: string;
  location: string;
  category: string;
}
export interface updateEventInterface {

  name?: string;
  id:string
  description?: string;
  date?: string;
  time?: string;

  location?: string;
  category?: string;
}
