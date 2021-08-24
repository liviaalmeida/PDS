import * as auth from './auth'

export type Endpoint = {
  url: string;
  options: {
    method: 'GET' | 'POST';
  };
}
export class API {
  token: string | null = null
  base = process.env.NODE_ENV === 'production' ? 'https://puncto-backend.ue.r.appspot.com' : 'http://localhost:3000';
  auth = auth

  get headers(): { headers: Record<string, string> } {
    return {
      headers: {
        ...(this.token && {'Authorization': `Bearer ${this.token}`}),
        'Content-Type': 'application/json',
      }
    }
  }

  setToken(token: string): void {
    this.token = token
  }

  async fetch({ url, options }: Endpoint, body: unknown): Promise<Response> {
    const response = await fetch(
      `${this.base}${url}`,
      {
        ...this.headers,
        ...(body !== undefined && { body: JSON.stringify(body) }),
        ...options,
      }
    )
    return await response.json()
  }
}
