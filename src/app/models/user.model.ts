export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
export interface createUserDTO extends Omit<User, 'id'> { }
export interface loginUser extends Omit<User, 'id' | 'email' | 'name' | 'address'
|'phone'> { }
