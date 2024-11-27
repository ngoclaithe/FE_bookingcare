import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  withCredentials: true, 
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const checkLogin = async () => {
  try {
    const response = await api.get('/api/check-login');
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const changePassword = async (userId, newPassword) => {
  try {
    const response = await api.post('/api/change-password', {
      id: userId,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};
export const getAllUser = async (data) => {
  try {
    const response = await api.post('/api/laydanhsachnguoidung',       
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/xoanguoidung/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    throw new Error('Lỗi khi xóa người dùng');
  }
};

export const updateUser = async (id, data) => {
  try {
    console.log("gia tri user id khi da sua", id);
    const response = await api.put(
      `/api/capnhatnguoidung/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi sửa thông tin người dùng:', error);
    throw new Error('Lỗi khi sửa thông tin người dùng');
  }
};
export const registerUser = async (userData) => {
  try {
    const payload = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: userData.password,
      address: userData.address,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      image: userData.image,
      roleId: userData.roleId,  
    };

    const response = await api.post('/api/dangkynguoidung', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Lỗi khi đăng ký người dùng';
      console.error('Lỗi khi đăng ký người dùng:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Lỗi kết nối với server:', error);
      throw new Error('Không thể kết nối với server. Vui lòng thử lại.');
    }
  }
};
