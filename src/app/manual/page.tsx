import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

export default function ManualPage() {
  const userId = null; // Fetch or generate a user ID as needed

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start lg:w-3xl">
        <nav>
          <Link href="/" className="text-blue-500 hover:underline">
            {"← Back "}
          </Link>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left leading-[1.1]">
          Recombee Demo - Manual (REST API via SDK)
        </h1>
        <p>
          This demo showcases how to get recommendations using Recombee's REST
          API via JavaScript SDK.
        </p>
        <form action="/manual" method="GET">
          <SearchInput
            className="border border-gray-300 rounded-md p-2"
            placeholder="Search for 'AI'..."
            name="search"
          />
        </form>
        <SearchResults userId={userId} />
      </main>
    </div>
  );
}
