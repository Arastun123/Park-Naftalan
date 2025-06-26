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

export async function getDataByid(modelName, id, locale = "az") {
  const langMap = {
    az: 1,
    en: 2,
    ru: 3,
  };
  const lang = langMap[locale] || 1;
  const url =
    modelName === "equipment"
      ? `http://localhost:5041/api/${modelName}/${id}?language=${locale}`
      : `http://localhost:5041/api/${modelName}/${id}`;

  try {
    const response = await axios.get(url, {
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

export async function createData(modelName, data) {
  console.log(data);
  try {
    const response = await axios.post(
      `http://localhost:5041/api/${modelName}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function updateData(modelName, id, data) {
  console.log(data);
  try {
    const response = await axios.put(
      `http://localhost:5041/api/${modelName}/${id}`,
      data,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          id,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in updateData:", error);
    return null;
  }
}

export async function deleteData(modelName, id) {
  try {
    const response = await axios.delete(
      `http://localhost:5041/api/${modelName}/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}
