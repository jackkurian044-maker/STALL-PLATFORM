import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Categories from "../components/sections/Categories";
import Featured from "../components/sections/Featured";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="container">
        <Hero />
        <Categories />
        <Featured />
      </main>
    </>
  );
}