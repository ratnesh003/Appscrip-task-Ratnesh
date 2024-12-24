import { Product } from "@/types";

export async function proPageLoad(): Promise<Product[]> {
    try {
        const res = await fetch('https://fakestoreapi.com/products');

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: Product[] = await res.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log('An unknown error occurred');
        }
        return [];
    }
}
