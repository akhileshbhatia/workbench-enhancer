export interface Migration {
  shouldUpgrade: () => Promise<boolean>;
  upgrade: () => Promise<void>;
}
