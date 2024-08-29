import envConfig from "@/config"
import { LoginResType } from "@/schemaValidations/auth.schema"
type CustomOptions = Omit<RequestInit, 'method'> & {  
    baseUrl?: string | undefined  
}

const ENTITY_ERROR_STATUS = 422  

type EntityErrorPayload = {
    message: string;
    errors: {
      field: string;
      message: string;
    }[];
  }

class HttpError extends Error {
    status: number
    payload: {
        message: string;
        [key: string]: any;
    }
    constructor({ status, payload }: { status: number; payload: any }) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}


export class EntityError extends HttpError {  
    status: number  
    payload: EntityErrorPayload  
  
    constructor({ status, payload }: { status: number; payload: EntityErrorPayload }) {
        super({ status, payload })
        this.status = status
        this.payload = payload
      } 
  }

class SessionToken {  
    private token = ''  
    get value() {  
        return this.token  
    }  

    set value(token: string) {  
        // Nếu gọi method này ở server thì sẽ bị lỗi  
        if (typeof window === 'undefined') {  
            throw new Error('Cannot set token on server side')  
        }  
        this.token = token  
    }  
}``

export const clientSessionToken = new SessionToken();

const request = async<Respones>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined;

    const baseHeaders = {
        'Content-Type': 'application/json',
        Authorisation: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
    }

    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    const res = await fetch(fullUrl, {
        ...options,
        method,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body
    });
    const payload: Respones = await res.json();
    const data = {
        status: res.status,
        payload
    }
    if (!res.ok) {
        throw new EntityError(
            data as{
                status: 422;
                payload: EntityErrorPayload;
            }
        );
    }else
       {
        throw new HttpError(data)
       }
    
    if (['/auth/login','/auth/register'].includes(url)) {  
        clientSessionToken.value = (payload as LoginResType).data.token  
    } else if ('/auth/logout'.includes(url)) {  
        clientSessionToken.value = ''  
    }
    return data;
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, { ...options, body });
    },

    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, { ...options, body });
    },
    delete<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, 'body'> | undefined
    ) {
        return request<Response>('DELETE', url, { ...options, body })
    }
}

export default http;