import Filters from "../components/shop/Filters"
import SearchBar from "../components/shop/SearchBar"
import ShopCard from "../components/shop/ShopCard"

const Shop = () => {
    return (
        <div className=" ">
            <div className="flex items-center justify-center pb-5 w-full flex flex-col relative ">
                {/* Sticky Search Bar */}
                <div
                    style={{
                        backgroundImage: "url('https://img.freepik.com/free-photo/green-trees-near-body-water-daytime_395237-20.jpg?semt=ais_hybrid&w=1080&q=80')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    className="sticky top-0 pt-24 z-30 w-full flex justify-center py-4 mb-2 ">
                    <SearchBar />
                </div>

                <div className="w-full flex items-start pt-6 container mx-auto">
                    {/* Sticky Filters Sidebar */}
                    <div className="w-[400px] shrink-0 border-r-[2px] border-gray-200 self-start sticky top-[180px] lg:top-[190px] h-[calc(100vh-170px)]">
                        <Filters />
                    </div>

                    <div className="w-full flex flex-col gap-5 p-5">
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <ShopCard key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop