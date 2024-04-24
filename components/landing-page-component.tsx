import LangingPageSections from "./Langingpage/Landing-page-sections";
import LangingPageFooter from "./Langingpage/Langing-page-footer";
import LangingPageNav from "./Langingpage/Langing-page-nav";

/** 
To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

export function LandingPageComponent() {
  return (
    <div>
      <LangingPageNav />
      <LangingPageSections />
      <LangingPageFooter />
    </div>
  );
}
