import { useState } from "react";
import { MessageInterface, Users } from "../../interface";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../services/get";
import { postLogout } from "../../services/post";

export function useLayout() {
  const [showCard, setShowCard] = useState(false);
  const [user, setUser] = useState<Users>();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState<MessageInterface>({
    show: false,
    message: "",
    type: "info",
  });

  const handleMouseEnter = () => {
    setShowCard(true);
  };
  const handleMouseLeave = () => {
    setShowCard(false);
  };

  const fetchUsers = async () => {
    try {
      const result = await getLogin();
      setUser(result.getLogin[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await postLogout();

      if (response.success) {
        navigate("/login");
      } else {
        setModal({
          show: true,
          message: "Erro ao tentar sair do site. Tente novamente mais tarde.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    fetchUsers,
    showCard,
    user,
    navigate,
    modal,
    handleLogout,
    isLoading
  };
}
