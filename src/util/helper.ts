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
