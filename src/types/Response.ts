type FacetMapItem = {
  name: string;
  count: number;
};

type FacetMap = {
  sub_category: FacetMapItem[];
  refined_quantity_unit: FacetMapItem[];
  main_category: FacetMapItem[];
  refined_volume_weight: FacetMapItem[];
  brand: FacetMapItem[];
  market_names: FacetMapItem[];
};

type ProductDepotInfoItem = {
  depotId: string;
  depotName: string;
  price: number;
  marketAdi: string;
  percentage: number;
  longitude: string;
  latitude: string;
  indexTime: string;
};

type ContentItem = {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  categories: string[];
  productDepotInfoList: ProductDepotInfoItem[];
};

export type Response = {
  numberOfFound: number;
  content: ContentItem[];
  facetMap: FacetMap;
};
