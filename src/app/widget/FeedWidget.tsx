"use client";

import {
  addRecommIdQueryParam,
  type CreateRequestFunction,
  DefaultItem,
  FeedWidget,
  PersistentUserID,
} from "@recombee/feed-widget-react";
import "@recombee/feed-widget-react/dist/styles.css";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SearchItems } from "recombee-js-api-client";
import { apiClient } from "../recombee";

const PAGE_SIZE = 10;

const SearchFeedWidget = ({ userId }: { userId: string | null }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || undefined;

  const widgetUserId = useMemo(() => {
    if (userId) {
      return userId;
    } else {
      return PersistentUserID.getId();
    }
  }, [userId]);

  const createRequest = useMemo<CreateRequestFunction>(
    () =>
      ({ count }) => {
        return new SearchItems(widgetUserId, query || "", count, {
          // TODO: Create scenario in Recombee Admin UI, otherwise setting this parameter returns an error
          // scenario: "search-items",
          cascadeCreate: true,
          returnProperties: true,
        });
      },
    [widgetUserId, query],
  );

  if (!query) return <div>Type in a search query.</div>;

  return (
    <div className="w-full">
      <h2 className="font-medium">Results for "{query}"</h2>
      <FeedWidget
        apiClient={apiClient}
        createRequest={createRequest}
        loadMoreTrigger="click"
        initialRowsCount={PAGE_SIZE}
        loadMoreRowsCount={PAGE_SIZE}
        contentClassName="grid-cols-1 gap-4"
        itemWrapperClassName="min-h-[48px]"
        ItemComponent={(props) => (
          <DefaultItem
            href={addRecommIdQueryParam(
              `${props.result?.values?.link}`,
              props.state.recommId,
            )}
            title={`${props.result?.values?.title}`}
            highlightedContent={`${props.result?.id}`}
          />
        )}
        LoadMoreTriggerComponent={(props) => (
          <div className="flex justify-center p-2">
            <button
              className="me-2 mb-2 rounded-lg bg-[#3f91ff] px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:ring-blue-300 focus:outline-hidden"
              onClick={props.state.handleTriggerClick}
              type="button"
            >
              More
            </button>
          </div>
        )}
      />
    </div>
  );
};

export const SearchFeed = dynamic(() => Promise.resolve(SearchFeedWidget), {
  ssr: false,
});
