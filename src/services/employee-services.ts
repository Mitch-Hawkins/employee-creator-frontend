interface CreateEmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  employmentType: string;
  startDate: string;
  hoursPerWeek: number;
}

interface UpdateEmployeeData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  employmentType?: string;
  startDate?: string;
  hoursPerWeek?: number;
}

export const getAllEmployees = async (page: number = 0) => {
  try {
    const response = await fetch(
      `http://localhost:8080/employees?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network Error");
    }
    throw error;
  }
};

export const getEmployeeById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8080/employees/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network Error");
    }
    throw error;
  }
};

export const createEmployee = async (data: CreateEmployeeData) => {
  try {
    const response = await fetch("http://localhost:8080/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network Error");
    }
    throw error;
  }
};

export const updateEmployee = async (id: number, data: UpdateEmployeeData) => {
  try {
    const response = await fetch(`http://localhost:8080/employees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network Error");
    }
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    return await fetch(`http://localhost:8080/employees/${id}`, {
      method: "DELETE",
    })
      .then((res) => console.log(res))
      .catch(() => false);
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network Error");
    }
    throw error;
  }
};
