interface Education {
  institution: string;
  country: string;
  level: string;
  major: string;
  isVerified: boolean;
  startYear: number;
  endYear: number;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  education: Education | null;
}

type Mentor = User;
