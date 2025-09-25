"use client";

import {
  addRecommIdQueryParam,
  CloseIcon,
  type CreateRequestFunction,
  DefaultInput,
  DefaultItem,
  DefaultSpinner,
  PersistentUserID,
  QuickSearchWidget,
  SearchIcon,
} from "@recombee/quick-search-widget-react";
import dynamic from "next/dynamic";
import { apiClient } from "../recombee";

import "@recombee/quick-search-widget-react/dist/styles.css";
import { useMemo } from "react";
import { Batch, SearchItems } from "recombee-js-api-client";

const SearchWidget = ({ userId }: { userId: string | null }) => {
  const widgetUserId = useMemo(() => {
    if (userId) {
      return userId;
    } else {
      return PersistentUserID.getId();
    }
  }, [userId]);

  const createRequest: CreateRequestFunction = useMemo(
    () =>
      ({ searchQuery }) => {
        return new Batch(
          [
            new SearchItems(widgetUserId, searchQuery, 5, {
              // TODO: Create scenario in Recombee Admin UI, otherwise setting this parameter returns an error
              // scenario: "search-items",
              cascadeCreate: true,
              returnProperties: true,
            }),
          ],
          {
            distinctRecomms: true,
          },
        );
      },
    [widgetUserId],
  );

  return (
    <div className="flex justify-center">
      <div className="@container-normal">
        <QuickSearchWidget
          apiClient={apiClient}
          createRequest={createRequest}
          minSearchCharactersCount={3}
          desktopMediaQuery="(min-width: 1000px)"
          popoverClassName="lg:w-[var(--qs-input-width)] lg:flex lg:justify-center"
          InputComponent={(props) => (
            <form
              method="GET"
              action="/widget"
              className="flex w-[400px] gap-2 text-[#374040]"
            >
              <div className="relative flex flex-grow overflow-hidden rounded-lg border border-[#d9dbdb]">
                <div className="absolute flex size-[38px] items-center justify-center text-[#737979]">
                  <SearchIcon />
                </div>
                <input
                  name="search"
                  type="text"
                  className="block h-[39px] w-full indent-[38px] outline-hidden"
                  placeholder={`Search for "AI"...`}
                  {...props.state.inputProps}
                />
                {props.state.isLoading && (
                  <DefaultSpinner className="rb:absolute rb:top-2.25 rb:right-2.25 rb:h-5 rb:w-5" />
                )}
              </div>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:ring-blue-300 focus:outline-hidden"
              >
                Search
              </button>
            </form>
          )}
          TriggerComponent={(props) => (
            <button
              {...props.state.triggerProps}
              className="flex size-[38px] items-center justify-center rounded-sm bg-blue-500 text-white"
            >
              <SearchIcon />
            </button>
          )}
          DropdownComponent={(props) => (
            <div className="mt-1 flex h-full max-h-full min-h-0 flex-col rounded-sm p-4! gap-4 bg-white text-[#374040] shadow-2xl lg:h-auto lg:w-[400px]">
              {!props.state.isDesktop && (
                <form className="flex items-center gap-2 p-2">
                  <div className="flex-grow">
                    <DefaultInput
                      state={props.state}
                      inputProps={{ placeholder: `Search for "AI"...` }}
                    />
                  </div>
                  <button
                    {...props.state.closeButtonProps}
                    className="flex size-[38px] items-center justify-center"
                  >
                    <CloseIcon />
                  </button>
                </form>
              )}
              <div className="flex min-h-0 flex-grow flex-col">
                <div className="px-4 py-4 pb-2 text-sm font-semibold text-[#3f91ff]">
                  Results
                </div>
                <div className="flex flex-col gap-2 py-2!">
                  {props.state.items(0).map((item) => (
                    <DefaultItem
                      key={item.key}
                      href={addRecommIdQueryParam(
                        `${item.values?.link}`,
                        item.recommId,
                      )}
                      primaryContent={item.values?.str_property}
                      secondaryContent={item.id}
                      {...item.itemProps}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const SearchInput = dynamic(() => Promise.resolve(SearchWidget), {
  ssr: false,
});
