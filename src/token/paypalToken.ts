import dotenv from 'dotenv';
dotenv.config();
export const accesToken = async (  ) => {
    const auth = Buffer.from('AZktAZSvxw8pWDWvzluKKb7Rd5mXppN61VcSDG8cr48MIszJxehuf-S9Yv0voTBweH67MH49A0IAHfWg' + ":" + 'EC-ItKUsGpVPqb5Ch1YQeN6dH9qsOmKV5UiyBA_dRs1G-aQX_-L5TBDmsMWnUD2AIXjJxAZB9CEv5Gsj').toString('base64');
    const response = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`,{
        method: 'POST',
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}