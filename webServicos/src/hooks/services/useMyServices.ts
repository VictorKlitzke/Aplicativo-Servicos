import { useEffect, useState } from "react";
import { Service } from "../../interface";
import { getServices } from "../../services/get";

export function useMyServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
      const fecthServices = async () => {
        try {
          const result = await getServices();
          setServices(result.getServices);
        } catch (error) {
          console.error(error);
        }
      }
  
      fecthServices();
    }, [])
  
    const handleOpenModal = (service: Service) => {
      setSelectedService(service);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedService(null);
    };

    return {
        handleCloseModal,
        handleOpenModal,
        services,
        selectedService,
        showModal
    }
}