import * as auth from './auth'

export type Endpoint = {
  url: string;
  options: {
    method: 'GET' | 'POST';
  };
}
export class API {
  token: string | null = null
  base = 'localhost:3000'
  auth = auth

  get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    }
  }

  setToken(token: string): void {
    this.token = token
  }

  async fetch({ url, options }: Endpoint, body: unknown): Promise<Response> {
    return await fetch(
      `${this.base}${url}`,
      {
        ...(this.token && this.headers),
        ...(body !== undefined && { body: JSON.stringify(body) }),
        ...options,
      }
    )
  }
}
