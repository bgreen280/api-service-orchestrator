export interface Raindrop {
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

export interface Tag {
  _id: string;
  title: string;
  parent: {
    $id: string;
  };
}

export interface Collection {
  _id: string;
  title: string;
  parent: {
    $id: string;
  };
}

export interface UpdateTagsParams {
  tags: string[];
  collectionId: string;
}
