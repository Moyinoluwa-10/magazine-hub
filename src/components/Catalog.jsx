import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Catalog = () => {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="lg:hidden" href="#">
          {/* <Package2Icon className="h-6 w-6" /> */}
          <span>Hello</span>
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
              {/* <input
                type="search"
                name=""
                id=""
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
              /> */}
              <CiSearch className="absolute left-2.5 top-[50%] -translate-y-[50%] text-gray-500 dark:text-gray-400 text-lg " />
              <input
                className="w-full bg-white shadow-none appearance-none pl-8 pr-2 md:w-2/3 lg:w-1/3 dark:bg-gray-950 border border-gray-300 py-[6px] rounded-md outline-none"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
      </header>

      <main className="flex flex-col p-4 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div className="flex flex-col gap-2 border border-gray-300 p-6 rounded-md">
              <img
                alt="Magazine Image"
                className="w-full object-cover bg-gray-100"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="font-semibold">Magazine Title 1</div>
              <div className="text-gray-500">
                This is the description of Magazine 1.
              </div>
              <button className="border py-2 px-2 rounded-md hover:bg-gray-100 transition-all">
                Order Now
              </button>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 border border-gray-300 p-6 rounded-md">
              <img
                alt="Magazine Image"
                className="w-full object-cover bg-gray-100"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="font-semibold">Magazine Title 2</div>
              <div className="text-gray-500">
                This is the description of Magazine 2.
              </div>
              <button className="border py-2 px-2 rounded-md hover:bg-gray-100 transition-all">
                Order Now
              </button>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 border border-gray-300 p-6 rounded-md">
              <img
                alt="Magazine Image"
                className="w-full object-cover bg-gray-100"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <div className="font-semibold">Magazine Title 3</div>
              <div className="text-gray-500">
                This is the description of Magazine 3.
              </div>
              <button className="border py-2 px-2 rounded-md hover:bg-gray-100 transition-all">
                Order Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="border py-2 px-5 rounded-md hover:bg-gray-100 transition-all">
            Load More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Catalog;
