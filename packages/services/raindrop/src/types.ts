export interface IRaindrop {
  tags: string[];
  collection: {
    $ref: string;
    $id: string;
    oid: string;
  };
  type: string;
  title: string;
  link: string;
  excerpt: string;
}

export interface ITag {
  _id: string;
  title: string;
  parent: {
    $id: string;
  };
}

export interface ICollection {
  _id: string;
  title: string;
  parent: {
    $id: string;
  };
}

export interface IUpdateTagsParams {
  tags: string[];
  collectionId: string;
}
