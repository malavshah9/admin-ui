import { AdminItem } from "@features/Dashboard/components/Container/Container.component";

export function searchInAdminItem(searchString: string, item: AdminItem) {
  const actualSearchString = searchString.toLowerCase();
  const searchableKeys: Array<keyof AdminItem> = ["email", "name", "role"];
  return (
    searchableKeys.filter((key) => {
      return item[key].includes(actualSearchString);
    }).length > 0
  );
}

export function deleteSelectedAdminById(
  items: AdminItem[],
  idsToDelete: Array<AdminItem["id"]>
) {
  let pushedArray = [];
  for (let i = 0; i < items.length; i++) {
    if (
      idsToDelete.findIndex((fValue, fIndex) => items[i].id === fValue) === -1
    ) {
      pushedArray.push(items[i]);
    }
  }
  return pushedArray;
}
