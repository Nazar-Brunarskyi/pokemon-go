export function getData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Problems with loading!')
      }
      
      return response.json();
    });
}