import { useCallback, useEffect, useRef, useState } from "react";
import {
  RecommendNextItems,
  SearchItems,
  type Recommendation,
} from "recombee-js-api-client";
import { apiClient } from "../recombee";
import { retryAsync } from "./retryAsync";

export const useItemLoader = ({
  userId,
  searchQuery,
}: {
  userId: string;
  searchQuery?: string | undefined;
}) => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const recommIdRef = useRef("");
  const hasMoreItems = useRef(true);

  const loadMoreItems = useCallback(async () => {
    if (!recommIdRef.current || loading || !hasMoreItems.current) return;
    setLoading(true);
    const nextItems = await retryAsync(
      () => apiClient.send(new RecommendNextItems(recommIdRef.current, 10)),
      { retry: 5, delay: 500 },
    );
    if (nextItems.recomms.length === 0) {
      hasMoreItems.current = false;
    } else {
      setItems((prevItems) => [...prevItems, ...nextItems.recomms]);
    }
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    if (!searchQuery) {
      setLoading(false);
      return;
    }

    const loadInitialItems = async () => {
      setLoading(true);
      hasMoreItems.current = true;
      const { recommId, recomms: initialItems } = await retryAsync(
        () =>
          apiClient.send(
            new SearchItems(userId, searchQuery, 10, {
              // TODO: Create scenario in Recombee Admin UI, otherwise setting this parameter returns an error
              // scenario: "search-items",
              cascadeCreate: true,
              returnProperties: true,
            }),
          ),
        { retry: 5, delay: 500 },
      );
      setItems(initialItems);
      recommIdRef.current = recommId;
      setLoading(false);
    };
    loadInitialItems();
  }, [searchQuery, userId]);

  return { items, loadMoreItems, loading, hasMoreItems };
};
