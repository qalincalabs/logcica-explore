type FavoriteListCreation = {
  name: string;
};

type FavoriteListRemoval = {
  id: string;
};

type FavoriteItemRemoval = {
  targetId: string;
  targetType: string;
  listId?: string;
};

type FavoriteItemAssignement = {
  targetId: string;
  targetType: string;
  listId?: string;
  assign: boolean;
};

type FavoriteList = {
  id: string;
  name: string;
};

type FavoriteItem = {
  targetId: string;
  targetType: string;
  listId: string;
};

type FavoriteQuery = {
  targetIds?: string[];
  targetTypes?: string[];
  listIds?: string[];
};

type FavoriteExistsQuery = {
  targetId: string;
  targetType: string;
};

function isEmpty(array: any[] | undefined) {
  return !Array.isArray(array) || array.length === 0;
}

const collectionKeys = ["activity", "partnership", "product", "counter"];

function allLists(): FavoriteList[] {
  return [{ id: "default", name: "default" }];
}

export function itemExists(query: FavoriteExistsQuery) {
  const items = findItems({
    targetIds: [query.targetId],
    targetTypes: [query.targetType],
  });
  return isEmpty(items) == false;
}

export function findItems(query: FavoriteQuery): FavoriteItem[] {
  if (isEmpty(query.listIds)) query.listIds = allLists().map((e) => e.id);

  if (isEmpty(query.targetTypes)) query.targetTypes = collectionKeys;

  const items = new Array<FavoriteItem>();

  for (const li of query.listIds || []) {
    for (const c of query.targetTypes || []) {
      const l = getLocalStorageItemList(li, c);
      items.push(
        ...l.map(
          (e) => ({ targetId: e, listId: li, targetType: c } as FavoriteItem)
        )
      );
    }
  }

  if (isEmpty(query.targetIds) == false) {
    return items.filter((i) => query.targetIds?.includes(i.targetId));
  } else {
    return items;
  }
}

export function assignItemToList(props: FavoriteItemAssignement): boolean {
  if (!props.listId) props.listId = "default";
  let l = getLocalStorageItemList(props.listId, props.targetType);
  if (props.assign) {
    if (l.indexOf(props.targetId) === -1) l.push(props.targetId);
  } else {
    l = l.filter((v) => v !== props.targetId);
  }

  saveLocalStorageItemList(props.listId, props.targetType, l);

  return props.assign;
}

export function removeItemFromList(props: FavoriteItemRemoval) {
  assignItemToList({ ...props, assign: false });
}

function addList(props: FavoriteListCreation) {
  // create localstorage favorites.items.6683b8e04ae580cb8e5724d4
}

function removeList(props: FavoriteListRemoval) {
  // remove list from localstorage favorites.lists
}

function getLocalStorageItemList(
  listId: string,
  collectionKey: string
): string[] {
  return JSON.parse(
    localStorage.getItem(getLocalStorageKey(listId, collectionKey)) ?? "[]"
  );
}

function getLocalStorageKey(listId: string, collectionKey: string): string {
  console.log("favorites.items." + listId + "." + collectionKey);
  return "favorites.items." + listId + "." + collectionKey;
}

function saveLocalStorageItemList(
  listId: string,
  collectionKey: string,
  targetIds: string[]
) {
  localStorage.setItem(
    getLocalStorageKey(listId, collectionKey),
    JSON.stringify(targetIds)
  );
}
