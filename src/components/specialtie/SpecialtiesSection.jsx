import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../common/SectionTitle';
import { getSpecialties } from '../../services/apiSpecialtie';

export const SpecialtiesSection = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách chuyên khoa
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();

        const formattedData = data.map((specialty) => ({
          id: specialty.id, // ID chuyên khoa
          name: specialty.name,
          image: require(`../../assets/images/chuyenkhoa/${specialty.image}`), // Đường dẫn ảnh
          descriptionHTML: specialty.descriptionHTML, // Mô tả bệnh (tiêu đề)
          descriptionMarkdown: specialty.descriptionMarkdown,
          route: `${specialty.id}`, // Đường dẫn đến chuyên khoa
        }));
        setSpecialties(formattedData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách chuyên khoa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleItemClick = (specialty) => {
    setSelectedSpecialty(specialty);
    navigate(specialty.route);
    console.log("Đã click vào chuyên khoa:", specialty.name);
  };

  if (loading) {
    return <div>Đang tải danh sách chuyên khoa...</div>;
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <SectionTitle>Khám chuyên khoa</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
            onClick={() => handleItemClick(specialty)} // Sử dụng sự kiện onClick
          >
            <img
              src={specialty.image}
              alt={specialty.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{specialty.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
