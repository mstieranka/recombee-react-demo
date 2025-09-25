# Recombee React Demo

This is a [Next.js](https://nextjs.org) project showcasing Recombee recommendations / search in React.

There are two ways to implement recommendations:

1. Widget SDKs - Feed Widget automatically handles logic regarding next pages etc., Quick Search Widget allows showing search results before the user clicks Enter.
2. Manual implementation - loading items is handled by a React hook that exposes the state and a callback to load the next page.

It is also possible to combine the two approaches (e.g. use the Feed Widget, but keep the search input logic custom without using Quick Search).

To upload your catalog, you can use `upload-catalog.js` as inspiration. Make sure to create all required properties in the Admin UI beforehand. See the [Recombee documentation](https://docs.recombee.com/getting_started#getting-started-catalog-sdk) for more details.

> [!NOTE]
> In general, we recommend that you read the [Getting Started](https://docs.recombee.com/getting_started#getting-started) page before going through this demo or whenever you feel like there's something that you don't fully understand. Also see the [About](#about) section of this README for links to the documentation of all relevant SDKs.

## Getting Started

Fill in your .env file:

```sh
cp .env.example .env
nano .env
```

Upload the catalog using:

```sh
pnpm upload-catalog
```

Run the development server using:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

The Widget page uses the following SDKs:

- [Feed Widget (React)](https://docs.recombee.com/widget-sdks/feed-widget-react)
- [Quick Search Widget (React)](https://docs.recombee.com/widget-sdks/quick-search-widget-react)
- [Recombee JS API Client](https://docs.recombee.com/js_client)

The Manual page uses the [Recombee JS API Client](https://docs.recombee.com/js_client).

The catalog uploader uses the [Node API Client](https://github.com/recombee/node-api-client).
