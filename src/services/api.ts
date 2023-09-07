import { url } from '../utils/constants';
import { getCookie, setCookie } from '../utils/cookie';
import { ILocationData } from './types/location';
import { ILoginRequest, ITokenResponse } from './types/login';
import { IPersonData } from './types/team';
import { IUserData } from './types/user';

interface IRequestOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: {
    'Content-Type'?: 'application/json' | 'multipart/form-data';
    authorization?: string;
  };
  body?: string | FormData;
}

const readStream = (res: Response) => {
  const reader = (res.body as ReadableStream<Uint8Array>).getReader();
  return new ReadableStream({
    start(controller) {
      return pump();
      function pump(): Promise<any> {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });
};

const onResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

const request = (path: string, options: IRequestOptions) => {
  return fetch(url + path, options).then(onResponse);
};

const getBearerAccessToken = () => `Bearer ${getCookie('accessToken')}`;

const getBearerRefreshToken = () => `Bearer ${getCookie('refreshToken')}`;

export const refreshTokenApi = (): Promise<string> => {
  return request('/auth/refresh', {
    method: 'GET',
    headers: { authorization: getBearerRefreshToken() },
  })
    .then(data => {
      setCookie('accessToken', data['accessToken']);
      setCookie('refreshToken', data['refreshToken']);
      return data['accessToken'];
    })
    .catch(err => console.log(err));
};

export const requestWithRefreshApi = (url: string, options: IRequestOptions) => {
  return request(url, { ...options, headers: { ...options.headers, authorization: getBearerAccessToken() } }).catch(err => {
    if (err === 401) {
      return refreshTokenApi()
        .then(token => {
          options = { ...options, headers: { ...options.headers, authorization: `Bearer ${token}` } };
          return request(url, options);
        })
        .catch(err => console.log(err));
    }
  });
};

export const postAppointmentRequest = (formData: FormData) => {
  return request('/appointments', { method: 'POST', body: formData });
};

export const getPhotoRequestApi = (id: number): Promise<string> => {
  return fetch(url + `/files/${id}`, { method: 'GET' })
    .then(res => readStream(res))
    .then(stream => new Response(stream))
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => url);
};

export const getTeamRequestApi = () => {
  return request('/team', { method: 'GET' }).then(async (team: IPersonData[]) => {
    for (const person of team) {
      const photo = await getPhotoRequestApi(person.photoId);
      person.photo = photo;
    }

    return team;
  });
};

export const getPersonRequestApi = (id: number) => {
  return request(`/team/${id}`, { method: 'GET' }).then(async (person: IPersonData) => {
    const photo = await getPhotoRequestApi(person.photoId);
    person.photo = photo;

    return person;
  });
};

export const postPersonRequestApi = (formData: FormData): Promise<{ id: number }> => {
  return requestWithRefreshApi('/team', { method: 'POST', body: formData });
};

export const patchPersonRequestApi = (id: number, formData: FormData): Promise<{ id: number }> => {
  return requestWithRefreshApi(`/team/${id}`, { method: 'PATCH', body: formData });
};

export const deletePersonRequestApi = (id: number): Promise<{ id: number }> => {
  return requestWithRefreshApi(`/team/${id}`, { method: 'DELETE' });
};

export const getLocationsRequestApi = () => {
  return request('/locations', { method: 'GET' }).then(async (locations: ILocationData[]) => {
    for (const location of locations) {
      const photo = await getPhotoRequestApi(location.photoId);
      location.photo = photo;
    }

    return locations;
  });
};

export const getLocationRequestApi = (id: number) => {
  return request(`/locations/${id}`, { method: 'GET' }).then(async (location: ILocationData) => {
    const photo = await getPhotoRequestApi(location.photoId);
    location.photo = photo;

    return location;
  });
};

export const postLocationRequestApi = (formData: FormData): Promise<{ id: number }> => {
  return requestWithRefreshApi('/locations', { method: 'POST', body: formData });
};

export const patchLocationRequestApi = (id: number, formData: FormData): Promise<{ id: number }> => {
  return requestWithRefreshApi(`/locations/${id}`, { method: 'PATCH', body: formData });
};

export const deleteLocationRequestApi = (id: number): Promise<{ id: number }> => {
  return requestWithRefreshApi(`/locations/${id}`, { method: 'DELETE' });
};

export const deleteScheduleCellsRequestApi = (idArray: number[]): Promise<{ message: string }> => {
  return requestWithRefreshApi('/schedule', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deletedCellsId: idArray }),
  });
};

export const postLoginRequestApi = (data: ILoginRequest): Promise<ITokenResponse> => {
  return request('/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const getLogoutRequestApi = () => {
  return request('/auth/logout', {
    method: 'GET',
    headers: {
      authorization: getBearerRefreshToken(),
    },
  });
};

export const getUserRequestApi = (): Promise<IUserData> => {
  return requestWithRefreshApi('/users/me', {
    method: 'GET',
  });
};
