import { SearchFeed } from "./FeedWidget";
import { SearchInput } from "./SearchWidget";

export default function WidgetPage() {
  const userId = null; // Fetch or generate a user ID as needed

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center sm:text-left leading-[1.1]">
          Recombee Demo - Widget SDK
        </h1>
        <p>
          This demo app showcases how to get recommendations using Recombee's
          Widget SDK.
        </p>
        <SearchInput userId={userId} />
        <SearchFeed userId={userId} />
      </main>
    </div>
  );
}
