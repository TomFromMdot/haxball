import { config } from '@context';
import { StatsKeysEnum } from '@types';

import { ofetch } from 'ofetch';

const fetch = ofetch.create({
  baseURL: config.app.baseUrl,
  retry: 3,
  retryDelay: 500,
  async onRequest({ request, options }) {
    console.log(`[${options.method}]`, request, JSON.stringify(options.body) || JSON.stringify(options.query) || {});
  },

  async onResponse({ response }) {
    const wrappedData = {
      status: response.status,
      data: response._data?.data || response?._data,
    };

    response._data = wrappedData;
  },
});

export default class {
  static async getStadium({ id }: { id: string }) {
    const config = { responseType: 'json', parseResponse: JSON.parse, method: 'GET' };

    //@ts-ignore
    const response = await fetch(`/maps/download/${id}`, config).catch((err) => console.log(err));

    return response;
  }

  static async updateUser(user: { auth: string; [key: string]: any }) {
    const config = { method: 'PUT', body: user };

    const response = await fetch('/users/update', config).catch((err) => console.log(err));

    return response;
  }

  static async updateStats(data: { auth: string; statsKey: StatsKeysEnum }) {
    const config = { method: 'PUT', body: data };

    const response = await fetch('/stats/update', config).catch((err) => console.log(err));

    return response;
  }

  static async userAuthenticate(user: { conn: string; auth: string; name: string }) {
    const config = { method: 'POST', body: user };

    const response = await fetch('/users/authenticate', config).catch((err) => console.log(err));

    return response;
  }

  static async getUser(user: { auth: string }) {
    const config = { method: 'GET', query: { auth: user.auth } };

    const response = await fetch(`/users/authenticate`, config).catch((err) => console.log(err));

    return response;
  }

  static async getConnection({ ip }: { ip: string }) {
    const config = {
      responseType: 'json',
      parseResponse: JSON.parse,
    };

    //@ts-ignore
    const response = await ofetch(`http://ip-api.com/json/${ip}?fields=66842623`, config).catch((err) => console.log(err));

    return response;
  }

  static async checkBlacklist({ ip }: { ip: string }) {
    const config = {
      responseType: 'json',
      parseResponse: JSON.parse,
    };

    //@ts-ignore
    const response = await ofetch(`https://proxycheck.io/v2/${ip}?key=m1sa13-378z70-wi5203-hc097b&vpn=3&asn=1&short=1`, config).catch((err) => console.log(err));

    return response;
  }
}
