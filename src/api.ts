
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const getDefaultOptions = {
    headers: {
        "Content-Type" : "application/json;charset=utf-8"
      },
    method: "GET"
}

const api = {
    getProducts: () => 
        fetch(`${baseUrl}/products`, getDefaultOptions)
            .then((response: any) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`${response.status} ${response.statusText}`);
        }),
   searchProducts: (val: string) => 
        fetch(`${baseUrl}/products/search?q=${val}`, getDefaultOptions)
            .then((response: any) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`${response.status} ${response.statusText}`);
        }),
}

export default api;