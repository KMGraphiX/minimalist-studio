import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const initialProducts = [
  { title: "ULTRA SMARTPHONE X", price: 999, inStock: true, category: "Smartphones", description: "Minimalist engineering.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"] },
  { title: "PRO LAPTOP Z", price: 1499, inStock: true, category: "Laptops", description: "Studio performance.", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"] },
  { title: "WIRELESS HEADPHONES A1", price: 299, inStock: false, category: "Headphones", description: "Pure sound.", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"] },
  { title: "SMART WATCH NEO", price: 349, inStock: true, category: "Smart Watches", description: "Timeless design.", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"] },
  { title: "PRO TABLET PRO", price: 799, inStock: true, category: "Tablets", description: "Professional tablet.", images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"] },
  { title: "PRO CAMERA X", price: 1299, inStock: true, category: "Cameras", description: "Professional photography.", images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32"] },
  { title: "GAMING CONTROLLER ELITE", price: 199, inStock: true, category: "Gaming Accessories", description: "Elite gaming experience.", images: ["https://images.unsplash.com/photo-1542751371-adc38448a05e"] },
  { title: "SMART HOME HUB", price: 499, inStock: true, category: "Smart Home Devices", description: "Connected home.", images: ["https://images.unsplash.com/photo-1489066229184-9074898c5789"] }
];

export const seedDatabase = async () => {
  try {
    const productsRef = collection(db, "products");
    for (const product of initialProducts) {
      await addDoc(productsRef, {
        ...product,
        createdAt: serverTimestamp()
      });
    }
    alert("DATABASE SEEDED SUCCESSFULLY! REFRESH THE PAGE.");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
