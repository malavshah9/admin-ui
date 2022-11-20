import React, { useReducer } from "react";
import { AdminItem } from "@APIs/Users.api";
import { searchInAdminItem } from "@util/helper";

type AdminReducerType = {
  items: AdminItem[];
  initialItems: AdminItem[];
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
      };
    };

function UserReducer(
  prevState: AdminReducerType,
  action: Action
): AdminReducerType {
  switch (action.type) {
    case "SEARCH": {
      const { searchString } = action.payload;
      if (searchString) {
        const filteredItems = prevState.initialItems.filter((item) =>
          searchInAdminItem(searchString, item)
        );
        return {
          ...prevState,
          items: filteredItems,
        };
      }
      return {
        initialItems: prevState.initialItems,
        items: prevState.initialItems,
      };
    }
    case "INITIAL_LOADED": {
      return {
        initialItems: action.payload.items,
        items: action.payload.items,
      };
    }
    default: {
      return prevState;
    }
  }
}

function useUsers() {
  const [users, dispatch] = useReducer(UserReducer, {
    items: [],
    initialItems: [],
  });

  const onSearch = (searchString: string) => {
    dispatch({
      type: "SEARCH",
      payload: {
        searchString,
      },
    });
  };

  const setInitialData = (data: AdminItem[]) => {
    dispatch({
      type: "INITIAL_LOADED",
      payload: {
        items: data,
      },
    });
  };

  return {
    users,
    onSearch,
    setInitialData,
  };
}

export default useUsers;
