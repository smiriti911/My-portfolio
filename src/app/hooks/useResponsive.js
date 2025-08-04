import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 641px) and (max-width: 1024px)" });

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  };
};

export default useResponsive;
