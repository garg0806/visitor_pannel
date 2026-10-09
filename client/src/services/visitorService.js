
import api from "./api";

export const addVisitor = async (visitorData) => {
  const response = await api.post("/visitors", visitorData);
  return response.data;
};

export const getVisitors = async (token) => {
  const response = await api.get("/visitors", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteVisitor = async (id, token) => {
  const response = await api.delete(`/visitors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateVisitor = async (id, visitorData, token) => {
  const response = await api.put(`/visitors/${id}`, visitorData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addVisitorReview = async (
  id,
  data,
  token
) => {

  const res = await api.put(
    `/visitors/${id}/review`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};