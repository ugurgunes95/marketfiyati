import fs from "fs";
import {
  Category,
  Endpoint,
  Payload,
  PayloadByKeyword,
  Response,
} from "./types";

class MarketPlace {
  static #instance: MarketPlace;
  url: string | null = null;
  categoryPayload: Payload;
  keywordPayload: PayloadByKeyword;

  private constructor() {
    this.url = "https://api.marketfiyati.org.tr/api/v2/";
    this.categoryPayload = {
      keywords: "Meyve ve Sebze",
      pages: 0,
      size: 24,
      menuCategory: true,
    };
    this.keywordPayload = {
      pages: 0,
      size: 5,
      keywords: "",
      latitude: "",
      longitude: "",
    };
  }

  public static get instance(): MarketPlace {
    if (!MarketPlace.#instance) {
      MarketPlace.#instance = new MarketPlace();
    }
    return MarketPlace.#instance;
  }

  public async searchByCategory(category: Category): Promise<Response> {
    const url = `${this.url}${Endpoint.byCategory}`;
    const payload: Payload = { ...this.categoryPayload, keywords: category };
    return this.fetcher<Response>(url, payload);
  }

  public async searchByKeyword(
    keyword: string,
    options?: Partial<PayloadByKeyword>
  ): Promise<Response> {
    const url = `${this.url}${Endpoint.byKeyword}`;
    const payload: PayloadByKeyword = {
      ...this.keywordPayload,
      ...options,
      keywords: keyword,
    };
    return this.fetcher<Response>(url, payload);
  }

  private async fetcher<T>(
    url: string,
    payload: Payload | PayloadByKeyword
  ): Promise<T> {
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(`Error fetching data:\t ${error.message}`);
      });
    return data;
  }
}

// Kullanım Örnekleri
const marketfiyati = MarketPlace.instance;

// Kategoriye göre arama örneği
marketfiyati
  .searchByCategory("Atıştırmalık ve Tatlı")
  .then((res) =>
    fs.writeFileSync(
      "./example-outputs/category-example.json",
      JSON.stringify(res, null, 2)
    )
  )
  .catch((err) => console.error(err));

// Anahtar kelimeye göre arama örneği
marketfiyati
  .searchByKeyword("muz")
  .then((res) =>
    fs.writeFileSync(
      "./example-outputs/keyword-example.json",
      JSON.stringify(res, null, 2)
    )
  )
  .catch((err) => console.error(err));

// Size en yakın yere göre arama örneği
marketfiyati
  .searchByKeyword("domates", {
    distance: 1,
    latitude: "40.9811687",
    longitude: "29.0254706",
  })
  .then((res) =>
    fs.writeFileSync(
      "./example-outputs/nearest-example.json",
      JSON.stringify(res, null, 2)
    )
  )
  .catch((err) => console.error(err));
