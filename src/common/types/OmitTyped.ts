export type OmitTyped<TObject, TKeys extends keyof TObject> = Omit<TObject, TKeys>;
