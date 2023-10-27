export type ChromeStorageQueryData = {
  data: string
};

export type TimeDetailsMap = Map<number, ChromeStorageQueryData>;

export type QueryDataMap = Map<string, TimeDetailsMap>;
