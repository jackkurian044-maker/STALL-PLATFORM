import Hero from "../components/sections/Hero";
import Categories from "../components/sections/Categories";
import Featured from "../components/sections/Featured";
import { getBusinesses, getCategories } from "../lib/api";

export default async function Home() {
  const [categories, businesses] = await Promise.all([
    getCategories(),
    getBusinesses(),
  ]);

  return (
    <main>
      <Hero />
      <Categories categories={categories} />
      <Featured businesses={businesses} />
    </main>
  );
}
