import { Todo } from "./components/Data/Todo";

export default async function GetData<T = Todo>(API_URL = 'https://jsonplaceholder.typicode.com/todos/'): Promise<T[]> {
  let res = await fetch(API_URL)
  if (res.ok == false) {
    return Array<T>()
  }
  // const results = Array<T>(...(await (await res.json())));
  const results = (await (await res.json()));
// json parse the results and return it as an array of Todo objects

  return results as T[];
}
