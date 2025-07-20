
import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });


  return {
    isMobile,
    isDesktop: !isMobile
  };
};

export default useResponsive;
