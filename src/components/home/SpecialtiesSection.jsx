import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Next } from '../common/Next';
import { SectionTitle } from '../common/SectionTitle';
import { getSpecialties } from '../../services/apiSpecialtie';
export const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;



  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const data = await getSpecialties();
      const formattedData = data.map((specialty) => ({
        name: specialty.name,
        image: require(`../../assets/images/chuyenkhoa/${specialty.image}`),
      }));
      setSpecialties(formattedData);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bác sĩ:', error);
      setError('Không thể tải dữ liệu bác sĩ.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSpecialties();
    
    const refreshInterval = setInterval(() => {
      fetchSpecialties();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [specialties]);

  const handleNext = () => {
    const maxPage = Math.ceil(specialties.length / itemsPerPage) - 1;
    setCurrentPage(prev => Math.min(prev + 1, maxPage));
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const getCurrentSpeacialties = () => {
    const start = currentPage * itemsPerPage;
    return specialties.slice(start, start + itemsPerPage);
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* <div className="text-center">Đang tải dữ liệu...</div> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        <SectionTitle>Chuyên khoa</SectionTitle>
        <div className="relative flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`absolute left-0 z-10 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Next direction="prev" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto w-full">
            {getCurrentSpeacialties().map((specialty, index) => (
              <Card 
                key={`${specialty.name}-${index}`}
                image={specialty.image}
                title={specialty.name}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage >= Math.ceil(specialties.length / itemsPerPage) - 1}
            className={`absolute right-0 z-10 ${
              currentPage >= Math.ceil(specialties.length / itemsPerPage) - 1 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <Next direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
};
