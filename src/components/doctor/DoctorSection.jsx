import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../common/SectionTitle';
import { getDoctor } from '../../services/apiDoctor';

export const DoctorSection = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctor();

        const formattedData = data.map((doctor) => ({
          id: doctor.id, 
          name: doctor.name,
          image: require(`../../assets/images/bacsi/${doctor.image}`), 
          route: `${doctor.id}`, 
        }));
        setDoctors(formattedData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sơ sở:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleItemClick = (doctor) => {
    setSelectedDoctor(doctor);
    navigate(doctor.route);
    console.log("Đã click vào cơ sở:", doctor.id);
  };

  if (loading) {
    return <div>Đang tải danh sách cở sở...</div>;
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <SectionTitle>Danh sách bác sĩ</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
            onClick={() => handleItemClick(doctor)} 
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
