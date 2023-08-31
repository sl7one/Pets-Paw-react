
import { useMediaQuery } from 'react-responsive';

export default function useMedia() {
   const isMobile: boolean = useMediaQuery({
      maxWidth: 768,
   });
   const isTablet: boolean = useMediaQuery({
      minWidth: 768,
      maxWidth: 1439,
   });
   const isDesktop: boolean = useMediaQuery({
      minWidth: 1440,
   });

   return { isMobile, isTablet, isDesktop };
}
