import api from "./api";

export const addInterview = async (data) => {
  const res = await api.post("/interviews", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getInterviews = async (token) => {
  const res = await api.get("/interviews", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateInterview = async (id, data, token) => {
  const res = await api.put(`/interviews/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const deleteInterview = async (id, token) => {
  const res = await api.delete(`/interviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};