import axios from 'axios';

export async function getAccessToken(userId: string): Promise<string> {
  
    try {
        const response = await axios({
          method: 'post',
          url: 'https://conduit.productionready.io/api/users/login',
          headers: { 
            'Content-Type': 'application/json', 
            'X-Requested-With': 'XMLHttpRequest', 
            'Cookie': '__cfduid=da84f350da46d79382a2c8902006dce141611005269'
          },
          data: JSON.stringify({"user":{"email":`${userId}@example.com`,"password":userId,"username":userId}})
        });

        return response.data.user.token;
      } catch (e) {
        console.error(
          `Could not login user: ${userId} and generate access token`
        );
        throw e;
      }
}
