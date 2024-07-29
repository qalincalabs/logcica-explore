export type FavoriteListCreation = {
  name: string;
};

export type FavoriteListImport = {
  name: string;
  data: Record<string, string[]>;
};

export type FavoriteListRemoval = {
  id: string;
};

export type FavoriteListRename = {
  id: string;
  name: string;
};

export type FavoriteItemRemoval = {
  targetId: string;
  targetType: string;
  listId?: string;
};

export type FavoriteItemAssignement = {
  targetId: string;
  targetType: string;
  listId?: string;
  assign: boolean;
};

export type FavoriteList = {
  id: string;
  name: string;
};

export type FavoriteItem = {
  targetId: string;
  targetType: string;
  listId: string;
};

export type FavoriteQuery = {
  targetIds?: string[];
  targetTypes?: string[];
  listIds?: string[];
};

export type FavoriteExistsQuery = {
  targetId: string;
  targetType: string;
};

function isEmpty(array: any[] | undefined) {
  return !Array.isArray(array) || array.length === 0;
}

const targetTypes = [
  "activity",
  "partnership",
  "product",
  "counter",
  "session",
  "recipe"
];

const isBrowser = typeof window !== "undefined";

export function allLists(): FavoriteList[] {
  if (!isBrowser) return [];
  const lists = localStorage.getItem("favorites.lists");
  return lists ? JSON.parse(lists) : [{ id: "default", name: "default" }];
}

export function findListById(id: string) {
  return allLists().find((list) => list.id === id);
}

function saveLists(lists: FavoriteList[]) {
  if (isBrowser) {
    localStorage.setItem("favorites.lists", JSON.stringify(lists));
  }
}

export function itemExists(query: FavoriteExistsQuery) {
  const items = findItems({
    targetIds: [query.targetId],
    targetTypes: [query.targetType],
  });
  return !isEmpty(items);
}

export function findItems(query: FavoriteQuery): FavoriteItem[] {
  if (isEmpty(query.listIds)) query.listIds = allLists().map((e) => e.id);

  if (isEmpty(query.targetTypes)) query.targetTypes = targetTypes;

  const items = new Array<FavoriteItem>();

  for (const li of query.listIds || []) {
    for (const c of query.targetTypes || []) {
      const l = getLocalStorageItemList(li, c);
      items.push(
        ...l.map(
          (e) => ({ targetId: e, listId: li, targetType: c }) as FavoriteItem,
        ),
      );
    }
  }

  if (!isEmpty(query.targetIds)) {
    return items.filter((i) => query.targetIds?.includes(i.targetId));
  } else {
    return items;
  }
}

export function importList(props: FavoriteListImport) {
  const list = addList({ name: props.name });
  const targetTypes = Object.keys(props.data);

  const items = [] as FavoriteItemAssignement[];

  for (const targetType of targetTypes) {
    items.push(
      ...props.data[targetType].map((i) => ({
        targetType: targetType,
        targetId: i,
        listId: list.id,
        assign: true,
      })),
    );
  }

  assignItemsToList(items);
  return list.id; // Retournez l'ID de la liste ajoutée
}

export function assignItemsToList(props: FavoriteItemAssignement[]): boolean[] {
  return props.map((p) => assignItemToList(p));
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

export function addList(props: FavoriteListCreation): FavoriteList {
  const lists = allLists();
  const newList = { id: `list_${Date.now()}`, name: props.name.trim() };
  lists.push(newList);
  saveLists(lists);
  return newList;
}

export function removeList(props: FavoriteListRemoval) {
  let lists = allLists();
  lists = lists.filter((list) => list.id !== props.id);
  saveLists(lists);

  // Remove all items from the deleted list
  for (const type of targetTypes) {
    localStorage.removeItem(getLocalStorageKey(props.id, type));
  }
}

export function renameList(props: FavoriteListRename) {
  let lists = allLists();
  const list = lists.find((list) => list.id === props.id);
  if (list) {
    list.name = props.name.trim();
    saveLists(lists);
  }
}

function getLocalStorageItemList(listId: string, targetType: string): string[] {
  if (!isBrowser) return [];

  return JSON.parse(
    localStorage.getItem(getLocalStorageKey(listId, targetType)) ?? "[]",
  );
}

function getLocalStorageKey(listId: string, targetType: string): string {
  return "favorites.items." + listId + "." + targetType;
}

function saveLocalStorageItemList(
  listId: string,
  targetType: string,
  targetIds: string[],
) {
  if (!isBrowser) return;

  localStorage.setItem(
    getLocalStorageKey(listId, targetType),
    JSON.stringify(targetIds),
  );
}

export function getAllFavorites(type: string): { [key: string]: string[] } {
  const allFavoriteLists = allLists();
  const allFavorites = allFavoriteLists.reduce(
    (acc, list) => {
      const favorites = findItems({
        listIds: [list.id],
        targetTypes: [type],
      }).map((e) => e.targetId);
      acc[list.id] = favorites;
      return acc;
    },
    {} as { [key: string]: string[] },
  );
  return allFavorites;
}
