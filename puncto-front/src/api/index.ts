import * as auth from './auth'
import * as client from './client'
import * as punch from './punch'
import * as user from './user'

export type Endpoint = {
  url: string;
  options: {
    method: 'GET' | 'POST' | 'PUT';
  };
}
export class API {
  token: string | null = null
  base = 'http://localhost:3000'
  auth = auth
  client = client
  punch = punch
  user = user

  get headers(): { headers: Record<string, string> } {
    return {
      headers: {
        ...(this.token && {'Authorization': `Bearer ${this.token}`}),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
