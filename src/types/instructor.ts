export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  coursesTaught: number;
  totalStudents: number;
  totalCourses: number;
  studentsTaught: number;
  courses: string[];
}
