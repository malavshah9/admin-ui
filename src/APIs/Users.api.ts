import API_ENDPOINTS from "@util/endpoints";
import http from "@util/http";


export type AdminItem = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
};

export async function getAdminData(){
  return http(API_ENDPOINTS.members , {method: 'get'});
}
