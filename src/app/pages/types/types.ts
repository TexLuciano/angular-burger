export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
  category_id: number;
  price: string;
  offer: boolean;
  createdAt: string;
  updatedAt: string;
  path: string;
  url: string;
  quantity:number
}

export interface Categories {
  createdAt?:string;
  id?:number;
  name:string;
  path?:string;
  updatedAt?:string;
  url?:string;
  products?:Product[]
}

export interface User{
   name:string
   password:string
   email:string
}

export interface SessionUser{
 
   password:string
   email:string
}