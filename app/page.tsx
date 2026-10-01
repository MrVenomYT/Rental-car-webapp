import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden bg-slate-50/50 min-h-screen">
      <Hero />

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 bg-white border-y border-gray-100">
        <div className="max-width padding-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Why Drive With Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Unmatched Convenience & Premium Quality
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              We streamline car rentals from instant AI recommendations to keyless pickup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary-blue flex items-center justify-center font-bold text-2xl mb-4">
                ⚡
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Instant AI Matching</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Our Gemini AI Assistant analyzes your trip preferences and recommends the optimal vehicle in seconds.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary-blue flex items-center justify-center font-bold text-2xl mb-4">
                🛡️
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Zero Hidden Fees</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Full price transparency with standard insurance options and flexible cancellation up to 24 hours prior.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary-blue flex items-center justify-center font-bold text-2xl mb-4">
                ✨
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Verified Fleet Quality</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Every vehicle is thoroughly inspected, detailed, and sanitized before your rental window begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Discover Catalogue */}
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Explore Fleet</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Vehicle Catalogue</h1>
          <p className="text-slate-500 text-sm">Filter and discover the ideal car for your next drive</p>
        </div>

        <div className="home__filters bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-8">
          <SearchBar />

          <div className="home__filter-container flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-100 w-full">
            <span className="text-xs font-bold text-slate-400 mr-2">Refine Spec:</span>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section className="mt-10">
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8">
              {allCars?.map((car, index) => (
                <CarCard key={`${car.make}-${car.model}-${car.year}-${car.fuel_type}-${index}`} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container my-16 p-12 bg-white rounded-3xl border border-gray-100 text-center max-w-lg mx-auto shadow-xs">
            <span className="text-4xl">🏎️</span>
            <h2 className="text-slate-900 text-xl font-bold mt-3">No matching cars found</h2>
            <p className="text-slate-500 text-xs mt-1">Try resetting filters or adjusting search parameters.</p>
            <a
              href="/"
              className="inline-block mt-5 px-6 py-2.5 bg-primary-blue text-white font-bold text-xs rounded-full shadow-sm hover:bg-blue-700 transition-colors"
            >
              Reset Search Filters
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
