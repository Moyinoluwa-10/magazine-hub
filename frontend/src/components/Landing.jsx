// react
import { Link } from "react-router-dom";
// icons
import { LuNewspaper } from "react-icons/lu";

const Landing = () => {
  return (
    <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <h1 className="font-bold text-2xl md:text-3xl mb-10">
              Welcome to MagazineHub
            </h1>
            <div>
              <div className="flex flex-col items-center gap-4">
                <LuNewspaper className="text-7xl md:text-9xl" />
                <h2 className="text-xl md:text-2xl font-semibold">
                  Explore the World of Magazines!
                </h2>
                <p className="text-gray-500">
                  We provide a wide range of magazines from various genres.
                  Explore now!
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Our Features:</h3>
                <ul className="list-disc list-inside">
                  <li>Wide range of magazines</li>
                  <li>Easy to order</li>
                  <li>Fast delivery</li>
                </ul>
                <p className="mt-4 mb-5">
                  Start exploring now and enjoy reading!
                </p>
                <Link
                  className="bg-black text-white py-3 px-7 rounded-md transition-all hover:bg-black/80 ml-auto"
                  to={"/catalog"}
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
