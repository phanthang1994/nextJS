import http from '@/lib/http';  
import { AccountResType } from '@/schemaValidations/account.schema';  

const accountApiRequest = {  
  me: async (sessionToken: string) => {  
    return await http.get<AccountResType>('account/me', {  
      headers: {  
        Authorization: `Bearer ${sessionToken}`  
      }  
    });  
  },  
  meClient: async () => {  
    return await http.get<AccountResType>('account/me');  
  }  
};  

export default accountApiRequest;