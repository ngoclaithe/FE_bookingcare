import axios from 'axios';


export const getDoctor = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/danhsachbacsi`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa');
  }
};

export const registerDoctor = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/dangkybacsi`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng ký chuyên khoa:', error);
    throw new Error('Lỗi khi đăng ký chuyên khoa');
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/xoabacsi/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa chuyên khoa:', error);
    throw new Error('Lỗi khi xóa chuyên khoa');
  }
};

export const updateDoctor = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/suabacsi/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi sửa thông tin chuyên khoa:', error);
    throw new Error('Lỗi khi sửa thông tin chuyên khoa');
  }
};
export const getDoctorClinics = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bacsicoso/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa theo ID:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa theo ID');
  }
};
export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/danhsachbacsi/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa theo ID:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa theo ID');
  }
};