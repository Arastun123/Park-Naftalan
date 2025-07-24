import axios from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const mainUrl = process.env.NEXT_PUBLIC_API_URL;

let apiKey = "24faec6b42da4a96ceea41d3";

export async function getDatas(modelName, locale = "az") {
  const langMap = {
    az: "az",
    en: "en",
    ru: "ru",
  };
  const lang = langMap[locale] || "az";

  try {
    const response = await axios.get(`${mainUrl}${modelName}`, {
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

export async function getDataById(modelName, id, locale) {
  const langMap = {
    az: 1,
    en: 2,
    ru: 3,
  };
  const lang = langMap[locale] || 1;
  const url = `${mainUrl}${modelName}/${id}`;
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

export async function getDataByIdLang(modelName, id, locale) {
  const langMap = {
    az: 1,
    en: 2,
    ru: 3,
  };
  const lang = langMap[locale] || 1;
  const url = `${mainUrl}${modelName}/${id}?language=${locale}`;
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
  const token = getToken();
  if (!token) return;
  console.log(token);
  try {
    const response = await axios.post(`${mainUrl}${modelName}`, data, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer  ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function createDataWithImage(modelName, data) {
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.post(`${mainUrl}${modelName}`, data, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer  ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Error in createDataWithImage:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function updateDataWithImage(modelName, id, data) {
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.put(`${mainUrl}${modelName}/${id}`, data, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer  ${token}`,
        id,
      },
    });

    return response;
  } catch (error) {
    console.error(
      "Error in updateDataWithImage:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function updateData(modelName, id, data) {
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.put(`${mainUrl}${modelName}/${id}`, data, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer  ${token}`,
        id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in updateData:", error);
    return null;
  }
}

export async function updateDataNoId(modelName, data) {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.put(`${mainUrl}${modelName}`, data, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.error("Error in updateData:", error);
    return null;
  }
}

export async function updateAbout(modelName, id, data) {
  console.log(data);

  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.put(`${mainUrl}${modelName}`, data, {
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer  ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Error in updateData:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function deleteData(modelName, id) {
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.delete(`${mainUrl}${modelName}/${id}`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getDatas:", error.message);
    return null;
  }
}

export async function getAznToUsdRate() {
  // const apiKey = "24faec6b42da4a96ceea41d3";

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/AZN`
  );
  const data = await res.json();

  if (data.result === "success") {
    const aznToUsdRate = data.conversion_rates.USD;

    return aznToUsdRate;
  } else {
    console.error(
      "Error fetching AZN to USD rate from ExchangeRate-API:",
      data["error-type"]
    );

    return null;
  }
}

export async function sendMail(endpoint, data) {
  try {
    const response = await axios.post(
      `${mainUrl}Notification/${endpoint}`,
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error in sendMail:", error.message, error.response?.data);
    return null;
  }
}
export async function loginAdmin(email, password) {
  try {
    const res = await axios.post(
      `${mainUrl}Auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    const token = res.data.token;
    Cookies.set("admin_token", token, {
      expires: new Date(res.data.expiration),
    });

    return res.data;
  } catch (error) {
    console.error("Admin login error:", error.response?.data || error.message);
    throw error;
  }
}

// Admin logout
// export async function logoutAdmin() {
//   try {
//     const res = await axios.post("/api/admin/logout");
//     Cookies.remove("admin_token");
//     return res.data;
//   } catch (error) {
//     console.error("Logout error:", error.message);
//     return null;
//   }   AdminPass123!
//       admin1@naftalan.com

// }

export async function logoutAdmin() {
  try {
    Cookies.remove("admin_token");
    return { message: "Logged out" };
  } catch (error) {
    console.error("Logout error:", error.message);
    return null;
  }
}

export function getToken() {
  const token = Cookies.get("admin_token");
  if (token) {
    return token;
  } else {
    toast.error("Tokenin etibarlılıq müddəti bitib");
    return null;
  }
}
