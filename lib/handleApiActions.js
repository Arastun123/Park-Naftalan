import axios from "axios";

export async function getDatas(modelName, locale = "az") {
  const langMap = {
    az: "az",
    en: "en",
    ru: "ru",
  };
  const lang = langMap[locale] || "az";

  try {
    const response = await axios.get(`http://localhost:5041/api/${modelName}`, {
      headers: {
        Accept: "*/*",
        "Accept-Language": lang,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function getDatasByid(modelName, locale = "az", id) {
  const langMap = {
    az: "az",
    en: "en",
    ru: "ru",
  };
  const lang = langMap[locale] || "az";
  try {
    const response = await axios.get(
      `http://localhost:5041/api/${modelName}/${id}`,
      {
        headers: {
          Accept: "*/*",
          "Accept-Language": lang,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function createData(modelName, data) {
  try {
    const response = await axios.post(
      `http://localhost:5041/api/${modelName}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function updateData(modelName, id, data) {
  try {
    const response = await axios.put(
      `http://localhost:5041/api/${modelName}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function deleteData(modelName, id) {
  try {
    const response = await axios.delete(
      `http://localhost:5041/api/${modelName}/${id}`
    );
    return response.status;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}
