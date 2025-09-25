"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const SearchInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
) => {
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("search");

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery ?? "");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const target = debouncedSearchQuery
      ? `${currentPathname}?search=${debouncedSearchQuery}`
      : currentPathname;
    router.push(target);
  }, [debouncedSearchQuery, router, currentPathname]);

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      {...props}
    />
  );
};
