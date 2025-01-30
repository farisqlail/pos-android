interface CustomError extends Error {
  status?: number;
}

const BASE_URL = "https://laildev.my.id/public/api";
// const BASE_URL = "http://localhost:8000/api";

export async function getResource<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the resource.") as CustomError;
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function loginResource<T>(endpoint: string, data: object): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = new Error("An error occurred while posting the resource.");
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}

export async function postResource(endpoint: string, data: object): Promise<{ data: object }> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = new Error("An error occurred while posting the resource.");
      throw error;
    }

    const responseData = await response.json();
    return { data: responseData }; 
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}


export async function updateResource<T>(endpoint: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the resource.") as CustomError;
      error.status = response.status;
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
}

export async function deleteResource(endpoint: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the resource.") as CustomError;
      error.status = response.status;
      throw error;
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}
