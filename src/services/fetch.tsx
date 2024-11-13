const BASE_URL = "https://laildev.my.id/public/api";

export async function getResource<T>(endpoint: string, token: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the resource.");
      (error as any).status = response.status;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postResource<T>(endpoint: string, data: T, token: string): Promise<T> {
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

// Fungsi untuk PATCH resource (update)
export async function updateResource<T>(endpoint: string, data: T, token: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = new Error("An error occurred while updating the resource.");
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
}

// Fungsi untuk DELETE resource
export async function deleteResource(endpoint: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("An error occurred while deleting the resource.");
      throw error;
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}
