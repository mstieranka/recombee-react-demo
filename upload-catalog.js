import "dotenv/config";
import { ApiClient, requests } from "recombee-api-client";

function getItems() {
  return [
    { id: "item1", title: "Item 1" },
    { id: "item2", title: "Item 2" },
    { id: "item3", title: "Item 3" },
  ];
}

export async function uploadCatalog() {
  const items = getItems();
  console.log(`Uploading ${items.length} items to the catalog...`);

  // We're using the Node.js client, since we need to use the private token to upload items
  const recombeeClient = new ApiClient(
    process.env.NEXT_PUBLIC_RECOMBEE_DATABASE_ID,
    process.env.RECOMBEE_PRIVATE_TOKEN,
    { region: process.env.NEXT_PUBLIC_RECOMBEE_REGION },
  );

  // Mark items that are no longer present in the catalog as hidden
  const existingItems = await recombeeClient.send(new requests.ListItems());
  const itemsToHide = existingItems.filter(
    (ei) => !items.find((i) => i.id === ei.id),
  );
  // Batch is used to improve performance by sending multiple requests in one HTTP call
  await recombeeClient.send(
    new requests.Batch(itemsToHide.map((i) => new requests.SetItemValues(i.id, { hidden: true }))),
  );
  if (itemsToHide.length > 0) {
    console.log(
      `Hidden ${itemsToHide.length} items that are no longer present.`,
    );
  }

  // Upload/update items
  await recombeeClient.send(
    new requests.Batch(
      items.map(
        (i) =>
          new requests.SetItemValues(
            i.id,
            { ...i, hidden: false },
            { cascadeCreate: true },
          ),
      ),
    ),
  );
  console.log(`Uploaded/updated ${items.length} items.`);
}

uploadCatalog().catch(console.error);
