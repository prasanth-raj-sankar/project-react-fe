// const BE_URL = 'http://localhost:4500'; // Backend URL
const BE_URL = 'https://project-be-qpt1.onrender.com'; // Backend URL

// Create User API
export const createStudentAPI = async (userDetails) => {
  const response = await fetch(`${BE_URL}/students`, {
    body: JSON.stringify(userDetails),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  console.log(response)
  return await response.json();
};


export const verifyAccountAPI = async (token) => {
  const response = await fetch(`${BE_URL}/students/verify-account?token=${token}`);
  return await response.json();
};

export const studentLoginAPI = async (payload) => {
  const response = await fetch(`${BE_URL}/students/login`, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status !== 200) {
    throw new Error("Invalid Credentials or Something Wrong");
  }

  return await response.json();
};


export const sendResetPasswordEmailAPI = async ({ email }) => {
  const response = await fetch(`${BE_URL}/students/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),  // Send the email in the request body
  });

  if (!response.ok) {
    throw new Error("Failed to send reset password email");
  }

  return await response.json();
};


// Reset Password API
export const resetPasswordAPI = async ({ token, password }) => {
  const response = await fetch(`${BE_URL}/students/reset-password?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password }),  // Send the new password in the request body
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  return await response.json();
};


export const createShortUrlAPI = async (urlDetails) => {
  const response = await fetch(`${BE_URL}/urls/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(urlDetails), // Ensure `urlDetails` contains `originalUrl`
  });

  if (!response.ok) {
    throw new Error("Failed to shorten URL");
  }

  return await response.json();
};

// Admin Login API
export const adminLoginAPI = async (payload) => {
  const response = await fetch(`${BE_URL}/admins/login`, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
// console.log(response)
  if (response.status !== 200) {
    throw new Error("Invalid Admin Credentials or Something Wrong");
  }

  return await response.json(); // response might contain a token or other data
};

// Admin Logout API
export const adminLogoutAPI = async () => {
  const response = await fetch(`${BE_URL}/admins/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to logout admin");
  }

  return await response.json(); // response might confirm the logout
};