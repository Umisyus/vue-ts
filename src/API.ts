export default async function GetData(API_URL = 'https://jsonplaceholder.typicode.com/todos/'): Promise<any> {
  let res = await fetch(API_URL)
  if (res.ok == false) {
    return []
  }
  return [...(await res.json())];
}
