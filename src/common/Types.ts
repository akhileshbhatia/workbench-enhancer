export type ChromeStorageQueryData = {
  data: string;
  isBookmarked: boolean;
};

export type TimeDetailsMap = Map<number, ChromeStorageQueryData>;

export type QueryDataMap = Map<string, TimeDetailsMap>;
