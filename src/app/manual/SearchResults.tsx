"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useItemLoader } from "./useItemLoader";

export const SearchResults = ({ userId }: { userId: string | null }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  const widgetUserId = useMemo(() => {
    if (userId) {
      return userId;
    } else {
      return "null";
    }
  }, [userId]);

  const { items, loadMoreItems, loading, hasMoreItems } = useItemLoader({
    userId: widgetUserId,
    searchQuery: query || undefined,
  });

  if (!query) return <div>Type in a search query.</div>;

  return (
    <div className="flex flex-col items-center w-full">
      {items.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {items.map((item) => (
            <div key={item.id} className="border p-4 rounded">
              <a
                href={item.values?.link as string}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {(item.values?.title as string) || "No title"}
              </a>
              <div className="text-sm text-gray-500 text-ellipsis overflow-hidden">
                ID: {item.id}
              </div>
              {(item.values?.description as string) && (
                <p className="mt-2 text-gray-800">
                  {item.values?.description as string}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {loading && <div>Loading...</div>}
      {!loading && hasMoreItems && (
        <button
          type="button"
          onClick={() => loadMoreItems()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};
