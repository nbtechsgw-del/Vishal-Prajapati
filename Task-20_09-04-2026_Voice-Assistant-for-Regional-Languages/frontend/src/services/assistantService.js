import API from "../utils/api";

export const sendMessage = async (message) => {
  try {
    const response = await API.post("/assistant", {
      message,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return {
      reply: "Server error occurred",
    };
  }
};
