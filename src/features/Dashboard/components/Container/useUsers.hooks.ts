import React, { useReducer } from "react";
import { AdminItem } from "@APIs/Users.api";
import { searchInAdminItem } from "@util/helper";

/*
  Context for manipulating user data
*/

type AdminReducerType = {
  items: AdminItem[];
  initialItems: AdminItem[];
  pageSize: number;
  currentPage: number;
  searchString: string;
  totalCount: number;
};

type Action =
  | {
      type: "SEARCH";
      payload: {
        searchString: string;
      };
    }
  | {
      type: "INITIAL_LOADED";
      payload: {
        items: AdminItem[];
        pageSize: number;
      };
    }
  | {
      type: "CHANGE_PAGE";
      payload: {
        newPage: number;
      };
    }
  | {
      type: "CHANGE_PAGE_SIZE";
      payload: {
        newPageSize: number;
      };
    }
  | {
      type: "DELETE_SELECTED";
      payload: {
        ids: Array<AdminItem["id"]>;
      };
    };

function UserReducer(
  prevState: AdminReducerType,
  action: Action
): AdminReducerType {
  switch (action.type) {
    case "SEARCH": {
      const { searchString } = action.payload;
      const { pageSize, initialItems } = prevState;
      if (searchString) {
        const filteredItems = initialItems.filter((item) =>
          searchInAdminItem(searchString, item)
        );
        return {
          ...prevState,
          items: filteredItems.slice(0, pageSize),
          searchString: action.payload.searchString,
          totalCount: filteredItems.length,
          currentPage: 0,
        };
      }
      return {
        ...prevState,
        initialItems: initialItems,
        items: prevState.initialItems.slice(0, prevState.pageSize),
        searchString: searchString,
        totalCount: initialItems.length,
        currentPage: 0,
      };
    }
    case "INITIAL_LOADED": {
      const { pageSize, items } = action.payload;
      return {
        ...prevState,
        initialItems: items,
        items: items.slice(0, pageSize),
        pageSize: pageSize,
        totalCount: items.length,
      };
    }
    case "CHANGE_PAGE": {
      const { newPage } = action.payload;
      const { searchString, initialItems, pageSize } = prevState;
      let actualItems = initialItems;
      const startIndex = newPage * pageSize;
      if (prevState.searchString) {
        actualItems = initialItems.filter((item) =>
          searchInAdminItem(searchString, item)
        );
      }
      actualItems = actualItems.slice(startIndex, startIndex + pageSize);
      return {
        ...prevState,
        currentPage: newPage,
        items: actualItems,
      };
    }
    case "CHANGE_PAGE_SIZE": {
      const { newPageSize } = action.payload;
      return {
        ...prevState,
        pageSize: newPageSize,
      };
    }
    case "DELETE_SELECTED": {
      const { ids } = action.payload;
      const { initialItems, currentPage, pageSize, searchString } = prevState;
      let newItems = initialItems.filter((item: AdminItem) => {
        return !ids.includes(item.id);
      });
      const startIndex = currentPage * pageSize;
      let filteredItems = newItems;
      if (searchString) {
        filteredItems = newItems
          .filter((item) => searchInAdminItem(searchString, item))
          .slice(startIndex, startIndex + pageSize);
      }
      return {
        ...prevState,
        items: searchString
          ? filteredItems
          : newItems.slice(startIndex, startIndex + pageSize),
        initialItems: searchString ? newItems : filteredItems,
        totalCount: filteredItems.length,
      };
    }
    default: {
      return prevState;
    }
  }
}

function useUsers() {
  const [userData, dispatch] = useReducer(UserReducer, {
    items: [],
    initialItems: [],
    pageSize: 10,
    currentPage: 0,
    searchString: "",
    totalCount: 0,
  });

  const { items, totalCount, currentPage, pageSize } = userData;

  const onSearch = (searchString: string) => {
    dispatch({
      type: "SEARCH",
      payload: {
        searchString,
      },
    });
  };

  const setInitialData = (data: AdminItem[], pageSize: number) => {
    dispatch({
      type: "INITIAL_LOADED",
      payload: {
        items: data,
        pageSize: pageSize,
      },
    });
  };

  const onChangePageNumber = (page: number) => {
    dispatch({
      type: "CHANGE_PAGE",
      payload: {
        newPage: page,
      },
    });
  };

  const onChangePageSize = (pageSize: number) => {
    dispatch({
      type: "CHANGE_PAGE_SIZE",
      payload: {
        newPageSize: pageSize,
      },
    });
  };

  const onDeleteSelected = (ids: string[]) => {
    dispatch({
      type: "DELETE_SELECTED",
      payload: {
        ids,
      },
    });
  };

  return {
    users: items,
    pageNumber: currentPage,
    totalCount: totalCount,
    pageSize: pageSize,

    onSearch,
    setInitialData,
    onChangePageNumber,
    onChangePageSize,
    onDeleteSelected,
  };
}

export default useUsers;
