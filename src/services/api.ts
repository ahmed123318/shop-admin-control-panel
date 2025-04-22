
// Example API service
export type User = {
  id: number;
  name: string;
  email: string;
  role: "Customer" | "Admin" | "Manager";
  status: "Active" | "Inactive";
  registered: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  // Simulating API call with mock data
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  
  // Transform the data to match our User type
  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: "Customer",
    status: "Active",
    registered: new Date().toISOString().split('T')[0]
  }));
};
